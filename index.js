import Star from './src/index.js'
import core from '@actions/core'
import github from '@actions/github'

(async function() {
  try {
    const options = {
      repo: github.context.repo.repo,
      username: github.context.actor || undefined,
      webhook: core.getInput('discord-webhook') || undefined,
      filename: core.getInput('template') || undefined,
      token: core.getInput('personal-github-token') || undefined,
      twitterAppKey: core.getInput('twitter-app-key') || undefined,
      twitterAppSecret: core.getInput('twitter-app-secret') || undefined,
      twitterOauthToken: core.getInput('twitter-oauth-token') || undefined,
      twitterOauthSecret: core.getInput('twitter-oauth-secret') || undefined
    }
    await Star(options)
  } catch(error) {
    core.setFailed(error.message);
  }
})()
