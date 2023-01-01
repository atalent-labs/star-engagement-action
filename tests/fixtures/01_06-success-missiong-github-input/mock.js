const { Router } = require('express')

module.exports = Router()
  .post('/discord/webhook', (req, res) => {
    return res.sendStatus(204)
  })
  .post('/2/tweets', (req, res) => {
    return res
      .json(req.body)
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
