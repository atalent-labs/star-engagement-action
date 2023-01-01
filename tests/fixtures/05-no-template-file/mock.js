const { Router } = require('express')

module.exports = Router()
  .get('/users/olivierodo', (req, res) => {
    return res
      .json({
        twitter_username: 'olivierodo-twt'
       })
  })
