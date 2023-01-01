import fs from 'fs'
import Joi from 'joi'
import path from 'path'
import yaml from 'yaml'
import Abstract from './_abstract.js'

class Content extends Abstract {

  #filename = null
  #content = null
  #twitterUsername = null

  constructor(options) {
    super(options)
    this.#filename = path.resolve(process.cwd(), options.filename)
    this.#twitterUsername = options.twitterUsername
    if (!fs.existsSync(this.#filename)) {
      throw new Error(`The template file "${path.basename(options.filename)}" does not exists`)
    }
  }

  get discord () {
    return this.content.notification.discord
  }

  get twitter () {
    return this.content.notification.twitter
  }

  get github() {
    return this.content.github
  }

  get filename () {
    return this.#filename
  }

  get twitterUsername () {
    return this.#twitterUsername
  }

  get content () {
    if (!this.#content) {
      const content = fs.readFileSync(this.filename)
        .toString()
        .replace(/\{\{(\s)*github-username(\s)*\}\}/g, this.username)
        .replace(/\{\{(\s)*twitter-username(\s)*\}\}/g, this.twitterUsername)
        .replace(/\{\{(\s)*github-repo(\s)*\}\}/g, this.repo)
      this.#content = yaml.parse(content)

      const {value, error} = Schema.validate(this.#content);
      if (error) {
        throw error;
      }
    }
    return this.#content
  }
}

const Schema = Joi.object({
  notification: {
    discord: Joi.string(),
    twitter: Joi.string()
  },
  github: {
    follow: Joi.boolean(),
    'add-star': Joi.boolean(),
    'create-issue': {
      title: Joi.string(),
      body: Joi.string()
    }
  }
})

export default Content
