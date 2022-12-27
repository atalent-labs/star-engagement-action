
class Abstract {

  #username = null
  #repo = null

  constructor(options) {
    this.#username = options.username
    this.#repo = options.repo
  }

  get username() {
    return this.#username
  }

  get repo() {
    return this.#repo
  }
}

export default Abstract
