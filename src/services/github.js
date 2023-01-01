import got from 'got'
import Abstract from './_abstract.js'

class Github extends Abstract {

  #instance = null
  #content = null
  #token = null
  #logger = null

  constructor(options) {
    super(options)
    this.#token = options.token
    this.#logger = options.logger
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

  set content (value) {
    this.#content = value
  }

  get content () {
    return this.#content.github
  }

  get host () {
    return process.env.GITHUB_API || 'https://api.github.com'
  }

  getUserRepo () {
    return `${this.host}/repos/${this.username}/${this.username}`
  }

  async follow() {
    if (false === this.content.follow) return 
    const url = `${this.host}/user/following/${this.username}`
    let result = false
    try {
      const { body } = await this.instance.put(url).json()
      this.#logger.write('✅ Github profile followed successfully')
    } catch (e) {
      throw new Error(`The Github user ${this.username} can't be followed`)
    }
    return result
  }

  async getTwitterUsername() {
    const url = `${this.host}/users/${this.username}`
    const { twitter_username } = await got.get(url).json()
    return twitter_username || undefined
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

  async addStar() {
    if (false === this.content['add-star']) return 
    const url = `${this.host}/user/starred/${this.username}/${this.username}`
    let result = false
    try {
      const { body } = await this.instance.put(url).json()
      this.#logger.write('✅ Github profile repo starred successfully')
    } catch (e) {
      result = true
      throw new Error(`The Github user profile repository can't be starred`)
    }
    return result

  }

  async createIssue() {
    try {
      const issueContent =  this.content['create-issue']
      if (undefined === issueContent) return 

      const url = this.getUserRepo() + '/issues'
      const issues = await this.instance.get(url + '?label=documentation').json()
      const alreadyHasIssue = issues.some(({title}) =>  title.includes(this.repo))
      if (alreadyHasIssue) return 

      const json = {
        ...issueContent,
        assignees: [
          this.username
        ],
        labels: [
          'documentation'
        ]
      }
      const { body } = await this.instance.post(url, { json })
      this.#logger.write('✅ Github profile repo issue created successfully')
      return body
    } catch(e) {
      throw new Error('The Github issue could not be created')
    }
  }
}


export default Github;
