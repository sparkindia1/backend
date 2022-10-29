import { CorsOptions } from 'cors';

export const isProduction = process.env.NODE_ENV === 'production';

export const corsConfig = (
  others?: Omit<CorsOptions, 'origin'>
): CorsOptions => ({
  credentials: true,
  optionsSuccessStatus: 200,
  origin: isProduction
    ? []
    : ['http://localhost:3000', 'http://localhost:3001'],
  ...others,
});
