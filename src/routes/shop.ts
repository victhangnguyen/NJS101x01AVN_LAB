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

  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
  });
});

export default router;
