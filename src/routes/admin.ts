//! core modules
import path from 'path';

import express, { Request, Response, NextFunction } from 'express';

//! utils - libs
import Logging from '../library/Logging';
import rootDir from '../utils/path';

const router = express.Router();

const pathFile = path.join(rootDir, 'views', 'add-product.html');

//! implicitly, this route is reached /admin/add-product/ => GET
router.get(
  '/add-product',
  (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(pathFile);
  }
);

//! implicitly, this route is reached /admin/add-product/ => POST
router.post(
  '/add-product',
  (req: Request, res: Response, next: NextFunction) => {
    Logging.info(req.body);
    //! Redirect
    res.redirect('/');
  }
);

export default router;
