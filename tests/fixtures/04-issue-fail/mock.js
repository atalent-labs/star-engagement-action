const { Router } = require('express')

module.exports = Router()
  .post('/discord/webhook', (req, res) => {
    return res.sendStatus(204)
  })
  .get('/repos/olivierodo/olivierodo/issues', (req, res) => {
    return res
      .json([])
  })
  .post('/repos/olivierodo/olivierodo/issues', (req, res) => {
    return res
      .status(403)
      .json({
        error: 'an issue occured'
      })
  })
  .put('/user/following/olivierodo', (req, res) => {
    return res.sendStatus(204)
  })
  .put('/user/starred/olivierodo/olivierodo', (req, res) => {
    return res.sendStatus(203)
  })
  .get('/repos/olivierodo/olivierodo', (req, res) => {
    return res
      .status(200)
      .json({
        id: 1234
      })
  })
  .get('/users/olivierodo', (req, res) => {
    return res
      .json({
       })
  })
