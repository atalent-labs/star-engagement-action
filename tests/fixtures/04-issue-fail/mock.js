const { Router } = require('express')

module.exports = Router()
  .post('/discord/webhook', (req, res) => {
    return res.sendStatus(204)
  })
  .post('/repos/olivierodo/olivierodo/issues', (req, res) => {
    return res
      .status(403)
      .json({
        error: 'an issue occured'
      })
  })
  .get('/repos/olivierodo/olivierodo', (req, res) => {
    return res
      .status(200)
      .json({
        id: 1234
      })
  })
