import path from 'path'
import yaml from 'yaml'
import fs from 'fs'
import got from 'got'
import {GenericContainer, Wait} from "testcontainers"
import Star from '../src/index.js'
import { URL } from 'url'


const fixtures = [
  './fixtures/01-success',
  './fixtures/02-webhook-fail',
  './fixtures/03-no-custom-profile',
  './fixtures/04-issue-fail'
]

const PORT = 8888
const containers = []

afterEach(async() => {
  if (!containers[containers.length -1]) return
  await containers[containers.length -1].stop()
})

test.each(fixtures)('Tests %s', async (fixture) => {
  const { 
    options,
    expected
  } = yaml.parse(fs.readFileSync(path.resolve('tests', fixture, 'expect.yml')).toString())

  options.filename = path.resolve('tests', fixture, options.filename)

  const imageContainer = await GenericContainer
    .fromDockerfile(path.resolve('tests', 'testcontainers'))
    .build();

  const mockContainer = await imageContainer
    .withExposedPorts(PORT)
    .withCopyFilesToContainer([{
      source: path.resolve('tests',fixture, 'mock.js'),
      target: "/app/mock.js",
    }])
    .withWaitStrategy(Wait.forLogMessage(/.*The server run on the port*/i))
    .start();
  containers.push(mockContainer)

    const port = mockContainer.getMappedPort(PORT);
		const host = `${mockContainer.getHost()}:${port}`;
		process.env.GITHUB_API = `http://${host}`;

    const webhook = new URL(options.webhook)
    webhook.host = host
    options.webhook = webhook.href

    if (expected.status === 'success') {
      await expect(Star(options)).resolves.toBe(true)
    } else {
      await expect(Star(options)).rejects.toThrow(expected.message)
    }
}, 30000)
