import got from 'got'
import Abstract from './_abstract.js'

class Github extends Abstract {

  #instance = null
  #content = null
  #token = null

  constructor(options) {
    super(options)
    this.#token = options.token
  }

  get instance () {
    if(!this.#instance) {
      this.#instance = got.extend({
        headers: {
          Authorization: `Bearer ${this.#token}`
        }
      })
    }
    return this.#instance
  }

  setContent (content) {
    this.#content = content.getGithubIssue()
    return this
  }

  getUserRepo () {
    const host = process.env.GITHUB_API || 'https://api.github.com'
    const url =  `${host}/repos/${this.username}/${this.username}`
    return url
  }

  async hasProfileRepository() {
    let result = false
    try {
      const { body } = await this.instance.get(this.getUserRepo()).json()
      result = true
    } catch(e) {
    }
    return result
  }

  async createIssue() {
    try {
      const content = this.#content
      const url = this.getUserRepo() + '/issues'
      const json = {
        ...content,
        assignees: [
          this.username
        ],
        labels: [
          'documentation'
        ]
      }
      const { body } = await this.instance.post(url, { json })
      return body
    } catch(e) {
      throw new Error('The Github issue could not be created')
    }
  }
}


export default Github;
