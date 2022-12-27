import Star from './src/index.js'
import core from '@actions/core'
import github from '@actions/github'

try {
  console.log(JSON.stringify(github, null, 2))

  const options = {
    repo: github.context.repo.repo,
    username: github.context.actor || undefined,
    webhook: core.getInput('discord-webhook') || undefined,
    filename: core.getInput('template') || undefined,
    token: core.getInput('personal-github-token') || undefined
  }
  console.log(options)
  //await Star(options)
} catch(error) {
  core.setFailed(error.message);
}
