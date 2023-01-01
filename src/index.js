import Discord from './services/discord.js'
import Twitter from './services/twitter.js'
import Github from './services/github.js'
import Content from './services/content.js'

export default async function Star (options) {

  const {
    filename = process.env.TEMPLATE,
    token = process.env.GH_TOKEN,
    username = process.env.GH_USERNAME,
    repo = process.env.GH_REPO,
    webhook = process.env.DISCORD_WEBHOOK,
    twitterAppKey = process.env.TWITTER_APP_KEY,
    twitterAppSecret = process.env.TWITTER_APP_SECRET,
    twitterOauthToken = process.env.TWITTER_OAUTH_TOKEN,
    twitterOauthSecret = process.env.TWITTER_OAUTH_SECRET,
    supportMe = process.env.SUPPORT_ME || true
  } = options
    
  const github = new Github({ username, token, repo})
  const twitterUsername = await github.getTwitterUsername()

  const content = new Content({ filename, repo, username, twitterUsername, supportMe})

  // DISCORD flow
  if (webhook) {
    const discord = new Discord({ webhook, content })
    await discord.notify()
  }

  // TWITTER flow
  if (twitterAppKey && twitterAppSecret && twitterOauthToken && twitterOauthSecret) {
    const credential = {
      twitterAppKey,
      twitterAppSecret,
      twitterOauthToken,
      twitterOauthSecret
    }
    const twitter = new Twitter({ content, credential })
    twitterUsername && await twitter.notify()
  }

  // GITHUB FLOW
  if (token) {
    github.content = content
    await github.follow()

    const result = await github.hasProfileRepository()
    if (true === result) {
      await github.addStar()
      await github.createIssue()
    } else {
      console.log('The user %s does not have a personal profile', options.username)
    }
  }
  return true
}
