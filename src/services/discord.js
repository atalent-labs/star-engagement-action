import got from 'got'

class Discord {

  #webhook = null
  #content = null

  constructor(options) {
    this.#webhook = options.webhook
    this.#content = options.content
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
          content: this.content.trim()
        }
      }
      const { body } = await got.post(this.webhook, options)
    } catch(e) {
      throw new Error('The Discord webhook fails.')
    }
  }
}

export default Discord
