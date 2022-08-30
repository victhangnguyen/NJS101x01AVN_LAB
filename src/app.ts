import Logging from './library/Logging';
import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';

//! an instance of the app object
const app = express();

//! Register Middlewares
app.use(express.urlencoded({ extended: false }));

app.use('/product', (req: Request, res: Response, next: NextFunction) => {
  Logging.info(req.body);
  //! Redirect
  res.redirect('/');
});

app.use('/add-product', (req: Request, res: Response, next: NextFunction) => {
  res.send(`
    <form action="/product" method="POST">
      <input type="text" name="title">
        <button type="submit">Add Product</button>
      </input>
    </form>
  `);
});
// next(); //! The Request goes through the File from TOP to BOTTOM,
//! if we dont call next(); it's not going to the next() middleware.

//! If middlewares 1 don't call next(), this middleware 2 will never get a chance of handling that Request.
//!
app.use('/', (req: Request, res: Response, next: NextFunction) => {
  //! (property) Response<any, Record<string, any>, number>.send: (body?: any) => express.Response<any, Record<string, any>>
  res.send(`<h1>Hello from Express</h1>`);
});

app.listen(3000);
