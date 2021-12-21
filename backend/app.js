//# imports
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

//## express
const app = express();

//## mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

//# middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

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
const payment_routes = require('./api/routes/payment');
app.use('/payment', payment_routes);

const product_routes = require('./api/routes/products');
app.use('/products', product_routes);

const task_routes = require('./api/routes/tasks');
app.use('/tasks', task_routes);

const user_routes = require('./api/routes/users');
app.use('/users', user_routes);

const session_routes = require('./api/routes/session');
app.use('/session', session_routes);

app.use((req, res, next) => {
  const error = Error(`Not Found ${req.path}`);
  error.status = 404;
  next(error);
});

//# exports
module.exports = app;
