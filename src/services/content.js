import fs from 'fs'
import Joi from 'joi'
import path from 'path'
import yaml from 'yaml'
import Abstract from './_abstract.js'

const SUPPORT_ME_HASHTAG = '#earlycontributor'
const SUPPORT_ME_LINK = 'Notification crafted with ❤️ by [Thank You early supporters action](https://github.com/marketplace/actions/thank-you-early-supporters-action)'

class Content extends Abstract {

  #filename = null
  #content = null
  #twitterUsername = null
  #supportMe = null

  #discord = null
  #twitter = null
  #github = null

  constructor(options) {
    super(options)
    this.#filename = path.resolve(process.cwd(), options.filename)
    this.#twitterUsername = options.twitterUsername
    this.#supportMe = String(options.supportMe) === 'true'
    if (!fs.existsSync(this.#filename)) {
      throw new Error(`The template file "${path.basename(options.filename)}" does not exists`)
    }
  }

  getSupportMe(type) {
    if (false === this.#supportMe) return ''
    const tmpl = {
      hashtag: ` ${SUPPORT_ME_HASHTAG}`,
      markdown: `\n---\n${SUPPORT_ME_LINK}\n`
    }
    return tmpl[type]
  }

  get discord () {
    if (!this.#discord) {
      let tmpl = this.content.notification.discord
      if (tmpl) {
        tmpl = tmpl.trim() + this.getSupportMe('markdown')
      }
      this.#discord = tmpl
    }
    return this.#discord
  }

  get twitter () {
    if (!this.#twitter) {
      let tmpl =  this.content.notification.twitter
      if (tmpl) {
        const newTmpl = tmpl.trim() + this.getSupportMe('hashtag')
        if (newTmpl.length <= 280) {
          tmpl = newTmpl
        }
      }
      this.#twitter = tmpl
    }
    return this.#twitter
  }

  get github() {
    if (!this.#github) {
      let github = this.content.github
      if (github['create-issue']) {
        const support = this.getSupportMe('markdown')
        if (support) {
          const tmpl = github['create-issue'].body.trim() + support
          github['create-issue'].body = tmpl
        } else {
          github['create-issue'].body = github['create-issue'].body.trim() + '\n'
        }

      }
      this.#github = github
    }
    return this.#github
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
