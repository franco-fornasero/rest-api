const express = require('express');
const morgan = require('morgan');
const apiRoutes = require('./routes');
const app = express();

app.set('json spaces', 2);

// middlewares
app.use(morgan('dev'));
app.use(jsonParser);
app.use('/api',apiRoutes);
app.use(express.urlencoded({extended : false}));
app.use(express.json());

module.exports = app;