import express from 'express';

//! imp Controllers
import ProductsController from '../controllers/products';

const router = express.Router();

router.get('/', ProductsController.getProducts);

export default router;
