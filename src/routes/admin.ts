import express, { Request, Response, NextFunction } from 'express';
import Logging from '../library/Logging';

const router = express.Router();

//! implicitly, this route is reached /admin/add-product/ => GET
router.get(
  '/add-product',
  (req: Request, res: Response, next: NextFunction) => {
    res.send(`
    <form action="/admin/add-product" method="POST">
      <input type="text" name="title">
        <button type="submit">Add Product</button>
      </input>
    </form>
  `);
  }
);

//! implicitly, this route is reached /admin/add-product/ => POST
router.post('/add-product', (req: Request, res: Response, next: NextFunction) => {
  Logging.info(req.body);
  //! Redirect
  res.redirect('/');
});

export default router;
