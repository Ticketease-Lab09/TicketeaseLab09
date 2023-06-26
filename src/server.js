'use strict';
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const app = express();


const authRoutes = require('./auth/routes.js');
const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(authRoutes);


app.get('/', welcomeHandler);
function welcomeHandler(req, res) {
    res.status(200).send('hi from home rout ');
}





app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
    server: app, 
    start: port => {
      if (!port) { throw new Error('Missing Port'); }
      app.listen(port, () => console.log(`Listening on ${port}`));
    },
  };
  