import express from 'express';
//! imp Controllers
import * as adminController from '../controllers/admin';

const router = express.Router();

//@ /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

//@ /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

//@ /admin/products => GET
router.get('/products', adminController.getProducts);

//@ /admin/edit-product => GET
router.get('/edit-product/:productId', adminController.getEditProduct);

//@ /admin/edit-product => POST

export default router;
