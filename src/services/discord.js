import got from 'got'

class Discord {

  #webhook = null
  #content = null

  constructor(options) {
    this.#webhook = options.webhook
  }

  setContent (content) {
    this.#content = content.getDiscordNotification()
    return this
  }

  get webhook () {
    return this.#webhook
  }

  async notify() {
    try {
      const options = {
        json: {
	        tts: false,
          content: this.#content
        }
      }
      const { body } = await got.post(this.webhook, options)
    } catch(e) {
      throw new Error('The Discord webhook fails.')
    }
  }
}

export default Discord
