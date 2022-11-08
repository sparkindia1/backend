import { Router } from 'express';
import {
  createOrder,
  cancelDeleteOrder,
  confirmDeleteOrder,
  getAllOrders,
  getMyOrders,
  getOrderById,
  getOrderStatus,
  initDeleteOrder,
  updateOrder,
  updateOrderStatus,
} from '../controllers/orders';
import { makeSafe } from '../utils/routes';

const orderRouter = Router();

orderRouter.get('/', makeSafe(getAllOrders));
orderRouter.post('/create', makeSafe(createOrder));
orderRouter.get('/mine', makeSafe(getMyOrders));
orderRouter.get('/id', makeSafe(getOrderById));
orderRouter.post('/update/id', makeSafe(updateOrder));
orderRouter.post('/delete/init', makeSafe(initDeleteOrder));
orderRouter.post('/delete/confirm', makeSafe(confirmDeleteOrder));
orderRouter.post('/delete/cancel', makeSafe(cancelDeleteOrder));
orderRouter.get('/status', makeSafe(getOrderStatus));
orderRouter.post('/update/status', makeSafe(updateOrderStatus));

export default orderRouter;
