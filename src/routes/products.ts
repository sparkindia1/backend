import { Router } from 'express';
import { createProduct } from '../controllers/products/createProduct';
import {
  confirmDeleteProduct,
  initDeleteProduct,
} from '../controllers/products/deleteProduct';
import { editProduct } from '../controllers/products/editProduct';
import {
  getAllProducts,
  getSingleProduct,
  searchProducts,
} from '../controllers/products/getProducts';
import { makeSafe } from '../utils/routes';
import {
  validateCancelDeleteProduct,
  validateConfirmDeleteProduct,
  validateCreateProduct,
  validateGetSingleProduct,
  validateInitDeleteProduct,
  validateSearchProducts,
  validateEditProduct,
} from '../validators/products';

const productRouter = Router();

productRouter.post('/create', validateCreateProduct, makeSafe(createProduct));

productRouter.post(
  '/delete/init',
  validateInitDeleteProduct,
  makeSafe(initDeleteProduct)
);

productRouter.post(
  '/delete/confirm',
  validateConfirmDeleteProduct,
  makeSafe(confirmDeleteProduct)
);

productRouter.post(
  '/delete/cancel',
  validateCancelDeleteProduct,
  makeSafe(confirmDeleteProduct)
);

productRouter.post('/all', makeSafe(getAllProducts));

productRouter.post(
  '/single',
  validateGetSingleProduct,
  makeSafe(getSingleProduct)
);

productRouter.post('/search', validateSearchProducts, makeSafe(searchProducts));

productRouter.post('/edit', validateEditProduct, makeSafe(editProduct));

export default productRouter;
