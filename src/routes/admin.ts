import express, { Request, Response, NextFunction } from 'express';
import Logging from '../library/Logging';

const router = express.Router();

router.get(
  '/add-product',
  (req: Request, res: Response, next: NextFunction) => {
    res.send(`
    <form action="/product" method="POST">
      <input type="text" name="title">
        <button type="submit">Add Product</button>
      </input>
    </form>
  `);
  }
);

router.post('/product', (req: Request, res: Response, next: NextFunction) => {
  Logging.info(req.body);
  //! Redirect
  res.redirect('/');
});

export default router;
