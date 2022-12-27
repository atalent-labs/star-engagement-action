import fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import Abstract from './_abstract.js'

class Content extends Abstract {

  #filename = null
  #content = null

  constructor(options) {
    super(options)
    this.#filename = path.resolve(process.cwd(), options.filename)
  }


  getGithubIssue() {
    return this.content.issue
  }


  getDiscordNotification() {
    return this.content.notification.discord
  }

  get filename () {
    return this.#filename
  }

  get content () {
    if (!this.#content) {
      const content = fs.readFileSync(this.filename)
        .toString()
        .replace(/\{\{(\s)*username(\s)*\}\}/g, this.username)
        .replace(/\{\{(\s)*repo(\s)*\}\}/g, this.repo)
      this.#content = yaml.parse(content)
    }
   return this.#content
  }

}

export default Content
