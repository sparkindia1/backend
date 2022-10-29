import { config } from 'dotenv';
config();
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { corsConfig } from './utils/appConfig';
import { globalErrorHandler, healthCheck } from './utils/routes';
import userRouter from './routes/users';
import orderRouter from './routes/orders';
import productRouter from './routes/products';

const app = express();
app.use(helmet());
app.use(cors(corsConfig()));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
