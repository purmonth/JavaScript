const express = require("express");
const app = express();
const port = 80;
const moogoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//MiddleWares
app.use(bodyParser.json());
app.use(cors());

//Inpurt Routes
const postsRoute = require('./routes/posts');

app.use('/', postsRoute);

//Connect to DB
moogoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('connect to db');
    });

app.listen(port);