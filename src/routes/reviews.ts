import { Router } from 'express';
import {
  createReview,
  deleteReview,
  getReviews,
  updateReview,
} from '../controllers/reviews';
import { makeSafe } from '../utils/routes';
import {
  ValidateCreateReview,
  validateDeleteReview,
  validateGetReviews,
  validateUpdateReview,
} from '../validators/reviews';

const reviewsRouter = Router();

reviewsRouter.post('/create', ValidateCreateReview, makeSafe(createReview));
reviewsRouter.post('/', validateGetReviews, makeSafe(getReviews));
reviewsRouter.post('/delete', validateDeleteReview, makeSafe(deleteReview));
reviewsRouter.post('/update', validateUpdateReview, makeSafe(updateReview));

export default reviewsRouter;
