import express from 'express';

//! imp Controllers
import * as shopController from '../controllers/shop';

const router = express.Router();

router.get('/', shopController.getIndex);

//@ /products => GET
router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

//@ /cart => GET
router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

export default router;
