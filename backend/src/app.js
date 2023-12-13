const express = require('express');
const cors = require('cors');
const router = require('./router');

const app = express();

const corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
//app.use(cors());
app.use(router);

module.exports = app;