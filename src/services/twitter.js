import { TwitterApi } from 'twitter-api-v2';
import got from 'got';
import { URL } from 'url'

class Twitter {

  #content = null
  #host = null
  #client = null
  #credential = null

  constructor(options) {
    this.#content = options.content
    this.#credential = options.credential
  }

  get #creds () {
    return {
      appKey: this.#credential.twitterAppKey,
      appSecret: this.#credential.twitterAppSecret,
      accessToken: this.#credential.twitterOauthToken,
      accessSecret: this.#credential.twitterOauthSecret
    }
  }

  get content () {
    return this.#content.twitter
  }

  get client () {
    if (!this.#client) {
      const baseURL = process.env.TWITTER_API
      const plugins = []
      if (baseURL) {
        plugins.push(new TwitterMockPlugin(baseURL))
      }
      this.#client = new TwitterApi(this.#creds, { plugins });
    }
    return this.#client
  }

  async notify() {
    try {
      if (undefined === this.content) return
      const alreadyTweeted = await this.checkAlreadyTweeted()
      if (alreadyTweeted) return
      await this.client.v1.tweet(this.content.trim());
    } catch(e) {
      //console.log(e)
      throw new Error('The tweet fails.')
    }
  }

  async checkAlreadyTweeted() {
    const q = `"${this.content.trim()}"`
    const { statuses } = await this.client.v1.get('search/tweets.json', { q })
    return statuses.length !== 0
  }
}

// Plugin use for mock purpose
class TwitterMockPlugin {

  #host = null

  constructor(host) {
    this.#host = new URL(host)
  }

  async onBeforeRequestConfig(args) {
    args.url.host = this.#host.host
    args.url.protocol = this.#host.protocol

    const opt = {
      url: args.url,
      method: args.params.method,
      form: args.params.body,
      searchParams: args.params.query
    }
    const body = await got(opt).json()
    return body
  }
}

export default Twitter
