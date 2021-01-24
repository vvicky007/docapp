const express = require('express')
const next = require('next')
const bodyParser = require('body-parser');
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const server = express()
const handle = app.getRequestHandler()

const slotrouter = require('./routes/addslot')

app.prepare()
.then(() => {
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use('/slots',slotrouter(server))
  server.get('*', (req, res) => {
    return handle(req, res)
  })
    
  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})