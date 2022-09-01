//! core modules
import path from 'path';

import express, { Request, Response, NextFunction } from 'express';

//! utils - libs
import Logging from '../library/Logging';
import rootDir from '../utils/path';

//! imp Models
import { Product } from '../models/product';

const router = express.Router();

const products: Product[] = [];

const pathFile = path.join(rootDir, 'views', 'add-product.html');

//! /admin/add-product/ => GET
router.get(
  '/add-product',
  (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(pathFile);
  }
);

//! /admin/add-product/ => POST
router.post(
  '/add-product',
  (req: Request, res: Response, next: NextFunction) => {
    //! add new Product object to productsArray
    //! set req.body type by TypeCasting
    const newProduct = { title: (req.body as { title: string }).title };
    products.push(newProduct);
    //! Redirect
    res.redirect('/');
  }
);

// exports.routes = router;
// exports.products = products;
export default { routes: router, products: products };
