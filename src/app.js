const express = require('express');
const morgan = require('morgan');

const app = express();
app.set('json spaces', 2);

// middlewares
app.use(morgan('dev'));
app.use('/api', require('./routes/topsecret'));
app.use('/api', require('./routes/topsecret_split'));
app.use(express.urlencoded({extended : false}));
app.use(express.json());

module.exports = app;