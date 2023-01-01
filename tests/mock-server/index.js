const Express = require('express')
const { PORT = 8888 } = process.env

const logs = {}

Express()
  .use(Express.json())
  .use(Express.urlencoded())
  .use((req, res, next) => {
    res.json = (obj) => {
      formatLog(req, res)
      res
        .set('content-type', 'application/json')
        .send(JSON.stringify(obj, null, 2))
    }
    res.sendStatus = (code) => {
      formatLog(req, res)
      res.statusCode = code
      res.send()
    }
    next()
  })
  .use(require('./mock.js'))
  .get('/log', (req, res) => {
    res
      .set('content-type', 'application/json')
      .send(JSON.stringify(logs, null, 2))
  })
  .listen(PORT, () => {
    console.log('The server run on the port %i', PORT)
  })

function isEmpty(obj) {
  if (Object.keys(obj).length === 0) {
    obj = undefined
  }
  return obj
}

function formatLog(req, res) {
  const r = req.method + ' ' + req.path
  logs[r] = {
    request: isEmpty({
      body: isEmpty(req.body),
      queries: isEmpty(req.query)
    })
  }
}
