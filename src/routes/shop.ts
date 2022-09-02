//! imp core modules
import path from 'path';

import express, { Request, Response, NextFunction } from 'express';

//! utils - libs
import rootDir from '../utils/path';
import Logging from '../library/Logging';

//! imp Routes
import adminData from './admin';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  const products = adminData.products;
  //! This will use the Default Tempalting Engine
  res.render('shop', {
    layout: false,
    prods: products,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products.length > 0,
  }); //! shop.pug
});

export default router;
