import path from 'path'
import yaml from 'yaml'
import fs from 'fs'
import got from 'got'
import {GenericContainer, Wait} from "testcontainers"
import Star from '../src/index.js'
import { URL } from 'url'

const PORT = 8888
const containers = []

// If you want to isolate a test
// put the number on the array below
const only = [
  //'07'
]

const fixtures = fs
  .readdirSync(path.resolve('.', 'tests', 'fixtures'))
  .filter(folder => {
    if (0 === only.length) return true
    return only.some(el => {
      return folder.startsWith(el)
    })
  })

afterEach(async() => {
  if (!containers[containers.length -1]) return
  await containers[containers.length -1].stop()
})

test.each(fixtures)('Tests %s', async (fixture) => {
  fixture = path.resolve('tests', 'fixtures', fixture)
  const { 
    options,
    expected
  } = yaml.parse(fs.readFileSync(path.resolve(fixture, 'expect.yml')).toString())

  options.filename =  path.resolve(fixture, options.filename)

  const imageContainer = await GenericContainer
    .fromDockerfile(path.resolve('tests', 'mock-server'))
    .build();

  const mockContainer = await imageContainer
    .withExposedPorts(PORT)
    .withCopyFilesToContainer([{
      source: path.resolve(fixture, 'mock.js'),
      target: "/app/mock.js",
    }])
    .withWaitStrategy(Wait.forLogMessage(/.*The server run on the port*/i))
    .start();
  containers.push(mockContainer)

  const port = mockContainer.getMappedPort(PORT);
	const host = `${mockContainer.getHost()}:${port}`;

	process.env.GITHUB_API = `http://${host}`;
	process.env.TWITTER_API = `http://${host}`;

  if (options.webhook) {
    const webhook = new URL(options.webhook)
    webhook.host = host
    options.webhook = webhook.href
  }

  if (expected.status === 'success') {
    await expect(Star(options)).resolves.toBe(true)
  } else {
    await expect(Star(options)).rejects.toThrow(expected.message)
  }
  
  const logs = await got.get('http://' + host + '/log').json()
  expect(logs).toEqual(expected.mocks || {})

}, 30000)
