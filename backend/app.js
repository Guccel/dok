//# imports
const express = require('express');
const morgan = require('morgan');
const amongoose = require('mongoose');

//## express
const app = express();

//## mongoose
amongoose.connect(process.env.MONGODB_URI);

//# middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH');
    return res.status(200);
  }
  next();
});

//# routes
const product_route = require('./api/routes/products');
app.use('/products', product_route);

const task_route = require('./api/routes/tasks');
app.use('/tasks', task_route);

const user_route = require('./api/routes/users');
app.use('/users', user_route);

const payment_route = require('./api/routes/payment');
app.use('/payment', payment_route);

app.use((req, res, next) => {
  const error = Error('Not Found');
  error.status = 404;
  next(error);
});

//# exports
module.exports = app;
