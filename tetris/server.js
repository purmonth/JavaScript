const express = require('express');
const app = express();
const expressPeerServer = require('peer').ExpressPeerServer;

const fs = require("fs"),
    https = require("https")

// ssl config
const sslOptions = {
    key: fs.readFileSync("./ssl/private.key"),
    ca: fs.readFileSync("./ssl/ca_bundle.crt"),
    cert: fs.readFileSync("./ssl/certificate.crt")
}


const server = https.createServer(sslOptions, app)
server.listen("8188", () => {
    console.log("Server listening on port :" + "8188")
})


const peerserver = expressPeerServer(server);
/* server creation */


app.use('/api', peerserver);

app.get('/a', function(req, res) {
    res.sendFile(__dirname + "/index-clientA.html");
});

app.get('/b', function(req, res) {
    console.log(__dirname);
    res.sendFile(__dirname + "/index-clientB.html");
});

peerserver.on('connection', (id) => {
    console.log(`A client connected : ${id}`);
})

peerserver.on('disconnect', (id) => {
    console.log(`A client say ~ bye bye : ${id}`);
});