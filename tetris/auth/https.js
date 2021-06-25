// require packages
const fs = require('fs'),
      https = require('https'),
      express = require('express'),
      app = express()

// ssl config 
const config = require('./config.js')
const sslOptions = {
  key: fs.readFileSync(config.key_path),
  ca: fs.readFileSync(config.ca_path),
  cert: fs.readFileSync(config.cert_path)
}

/*
const client = new line.Client(lineConfig)
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null)
  }

  if (event.message.id == '100001') return 200 // to deal with verify dummy data

  return client.replyMessage(event.replyToken, { 
    type: 'text',
    text: event.message.text
  })

*/

app.get("/users", (req, res) => {
  res.send("You login with fb!!")
})

const server = https.createServer(sslOptions, app)
server.listen(config.port, () => {
	console.log(`listen on port ${config.port}`)
})
