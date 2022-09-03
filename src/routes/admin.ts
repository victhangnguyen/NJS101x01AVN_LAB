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

//! /admin/add-product/ => GET
router.get(
  '/add-product',
  (req: Request, res: Response, next: NextFunction) => {
    res.render('add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
    });
  }
);

//! /admin/add-product/ => POST
router.post(
  '/add-product',
  (req: Request, res: Response, next: NextFunction) => {
    const newProduct = { title: (req.body as { title: string }).title };

    products.push(newProduct);
    //! Redirect
    res.redirect('/');
  }
);

export default { routes: router, products: products };
