import express from 'express';

//! imp Controllers
import * as shopController from '../controllers/shop';

const router = express.Router();

//@ / => GET
router.get('/', shopController.getIndex);

//@ /products => GET
router.get('/products', shopController.getProducts);

//@ /products/:productId => GET
router.get('/products/:productId', shopController.getProduct);

//@ /cart => GET
router.get('/cart', shopController.getCart);

//@ /cart => POST
router.post('/cart', shopController.postCart);

//@ /cart-delete-item => POST
router.post('/cart-delete-item', shopController.postCartDeleteProduct);

//@ /orders => GET
router.get('/orders', shopController.getOrders);

//@ /create-order => POST
router.post('/create-order', shopController.postOrder);

export default router;
