import Discord from './services/discord.js'
import Github from './services/github.js'
import Content from './services/content.js'

export default async function Star (options) {

  const {
    filename = process.env.TEMPLATE,
    token = process.env.GH_TOKEN,
    username = process.env.GH_USERNAME,
    repo = process.env.GH_REPO,
    webhook = process.env.DISCORD_WEBHOOK
  } = options
    
  const content = new Content({ filename, repo, username })

  // Notification Discord
  let opt = {
    repo,
    username
  }
  const discord = new Discord({ webhook })
  await discord
    .setContent(content)
    .notify()

  // Issue creation
  const github = new Github({ username, token})
  const result = await github.hasProfileRepository()
  if (true === result) {
    await github
      .setContent(content)
      .createIssue(token)
  } else {
    console.log('The user %s does not have a personal profile', options.username)
  }
  return true
}
