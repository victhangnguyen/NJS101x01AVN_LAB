import express from 'express';
//! imp Controllers
import * as adminController from '../controllers/admin';

const router = express.Router();

// //@ /admin/add-product => GET
// router.get('/add-product', adminController.getAddProduct);

// //@ /admin/add-product => POST
// router.post('/add-product', adminController.postAddProduct);

// //@ /admin/products => GET
// router.get('/products', adminController.getProducts);

// //@ /admin/edit-product/:productId => GET
// router.get('/edit-product/:productId', adminController.getEditProduct);

// //@ /admin/edit-product/:productId => POST
// router.post('/edit-product', adminController.postEditProduct);

// //@ /admin/delete-product => POST
// router.post('/delete-product', adminController.postDeleteProduct);

export default router;
