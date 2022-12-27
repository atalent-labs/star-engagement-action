const Express = require('express')

const { PORT = 8888 } = process.env

Express()
  .use(require('./mock.js'))
  .listen(PORT, () => {
    console.log('The server run on the port %i', PORT)
  })
