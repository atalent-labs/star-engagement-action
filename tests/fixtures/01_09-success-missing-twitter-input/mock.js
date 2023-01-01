const { Router } = require('express')

module.exports = Router()
  .post('/discord/webhook', (req, res) => {
    return res.sendStatus(204)
  })
  .put('/user/following/olivierodo', (req, res) => {
    return res.sendStatus(204)
  })
  .post('/repos/olivierodo/olivierodo/issues', (req, res) => {
    return res.json({
      success: true
    })
  })
  .get('/repos/olivierodo/olivierodo', (req, res) => {
    return res.json({
      id: 1234
    })
  })
  .put('/user/starred/olivierodo/olivierodo', (req, res) => {
    return res.sendStatus(203)
  })
  .get('/repos/olivierodo/olivierodo/issues', (req, res) => {
    return res.json([])
  })
  .get('/users/olivierodo', (req, res) => {
    return res
      .json({
        twitter_username: 'olivierodo-twt'
       })
  })
