import express from 'express';

//! imp Controllers
import * as ProductsController from '../controllers/products';

const router = express.Router();

router.get('/', ProductsController.getProducts);

export default router;
