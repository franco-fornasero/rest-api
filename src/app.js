const express = require('express');
const morgan = require('morgan');

const app = express();
app.set('json spaces', 2);

// middlewares
app.use(morgan('dev'));
app.use(require('./routes'))
app.use(express.urlencoded({extended : false}));
app.use(express.json());

module.exports = app;