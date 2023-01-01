const { Router } = require('express')

module.exports = Router()
  .post('/discord/webhook', (req, res) => {
    return res.sendStatus(204)
  })
  .post('/repos/olivierodo/olivierodo/issues', (req, res) => {
    return res
      .json({
        success: true
      })
  })
  .put('/user/following/olivierodo', (req, res) => {
    return res.sendStatus(204)
  })
  .get('/repos/olivierodo/olivierodo', (req, res) => {
    return res
      .status(403)
      .json({
        message: 'An error happened'
      })
  })
  .get('/users/olivierodo', (req, res) => {
    return res
      .json({
       })
  })
