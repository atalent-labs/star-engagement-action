const { Router } = require('express')

module.exports = Router()
  .post('/discord/webhook', (req, res) => {
    return res.sendStatus(204)
  })
  .put('/user/following/olivierodo', (req, res) => {
    return res.sendStatus(204)
  })
  .put('/user/starred/olivierodo/olivierodo', (req, res) => {
    return res.sendStatus(403)
  })
  .post('/repos/olivierodo/olivierodo/issues', (req, res) => {
    return res.sendStatus(204)
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
        twitter_username: 'olivierodo-twt'
       })
  })
  .post('/1.1/statuses/update.json', (req, res) => {
    return res
      .json(req.body)
  })
  .get('/1.1/search/tweets.json', (req, res) => {
    return res.json({
      data: {
        statuses: []
      }
    })
  })
