//# imports
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import env from './environment.config';

//## express
const app: express.Application = express();

//## mongoose
mongoose.connect(env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true });

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
import routes from './routes';
app.use('/', routes);

//# security
if (false)
  app.use((req, res, next) => {
    if (req.get('origin') !== 'http://localhost:4000') {
      console.log('bad');
      return res.status(404).json({});
    }
    next();
  });

app.use((req, res, next) => {
  const error: any = Error(`Not Found ${req.path}`);
  error.status = 404;
  next(error);
});

app.listen(env.PORT);
