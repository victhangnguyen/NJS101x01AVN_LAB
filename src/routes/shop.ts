import express from 'express';

//! imp Controllers
import * as shopController from '../controllers/shop';
import isAuth from '../middleware/is-auth';

const router = express.Router();

//@ / => GET
router.get('/', shopController.getIndex);

//@ /products => GET
router.get('/products', shopController.getProducts);

//@ /products/:productId => GET
router.get('/products/:productId', shopController.getProduct);

//@ /cart => GET
router.get('/cart', isAuth, shopController.getCart);

//@ /cart => POST
router.post('/cart', isAuth, shopController.postCart);

//@ /cart-delete-item => POST
router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);

//@ /orders => GET
router.get('/orders', isAuth, shopController.getOrders);

//@ /create-order => POST
router.post('/create-order', isAuth, shopController.postOrder);

export default router;
