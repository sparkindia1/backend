import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import userRouter from './routes/users';
import orderRouter from './routes/orders';
import productRouter from './routes/products';
import { corsConfig, isProduction } from './utils/appConfig';
import { globalErrorHandler, healthCheck } from './utils/routes';

const app = express();

app.use(helmet());
app.use(cors(corsConfig()));
app.use(
  cookieSession({
    name: 'sparkindia-session',
    keys: [process.env.COOKIE_SESSION_KEY as string],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.set('debug', !isProduction);

app.all('/health', healthCheck);
app.use('/user', userRouter);
app.use('/orders', orderRouter);
app.use('/products', productRouter);

/**
 * More Routes here
 */

app.use(globalErrorHandler);
process.on('uncaughtException', (error: Error) => {
  console.error(error);
  process.exit(1);
});

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.DATABASE_URL!)
  .then(() => app.listen(port))
  .then(() => console.log('listening on port ' + port))
  .catch((err) => {
    console.log('Error in connecting to the database');
    console.error(err);
    process.exit(1);
  });
