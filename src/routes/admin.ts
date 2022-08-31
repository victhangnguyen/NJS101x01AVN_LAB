import express, { Request, Response, NextFunction } from 'express';
import Logging from '../library/Logging';
import path from 'path';

const router = express.Router();

const pathFile = path.join(__dirname, '../', 'views', 'add-product.html');

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
