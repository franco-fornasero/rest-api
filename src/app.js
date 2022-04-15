const express = require('express');
const morgan = require('morgan');
const apiRoutes1 = require('./routes/topsecret');
const apiRoutes2 = require('./routes/topsecret_split');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const app = express();
app.set('json spaces', 2);

// middlewares
app.use(morgan('dev'));
app.use(jsonParser);
app.use('/api/topsecret/', apiRoutes1);
app.use('/api/topsecret_split', apiRoutes2);
app.use(express.urlencoded({extended : false}));
app.use(express.json());

module.exports = app;