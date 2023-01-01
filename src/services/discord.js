import got from 'got'

class Discord {

  #webhook = null
  #content = null
  #logger = null

  constructor(options) {
    this.#webhook = options.webhook
    this.#content = options.content
    this.#logger = options.logger
  }

  get content () {
    return this.#content.discord
  }

  get webhook () {
    return this.#webhook
  }

  async notify() {
    if (undefined === this.content) return
    try {
      const options = {
        json: {
	        tts: false,
          content: this.content
        }
      }
      const { body } = await got.post(this.webhook, options)
      this.#logger.write('✅ Discord Notification sent successfully')
    } catch(e) {
      throw new Error('The Discord webhook fails.')
    }
  }
}

export default Discord
