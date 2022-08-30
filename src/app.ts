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

app.use('/add-product', (req: Request, res: Response, next: NextFunction) => {
  res.send(`
    <form action="/product" method="POST">
      <input type="text" name="title">
        <button type="submit">Add Product</button>
      </input>
    </form>
  `);
});

app.post('/product', (req: Request, res: Response, next: NextFunction) => {
  Logging.info(req.body);
  //! Redirect
  res.redirect('/');
});

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  //! (property) Response<any, Record<string, any>, number>.send: (body?: any) => express.Response<any, Record<string, any>>
  res.send(`<h1>Hello from Express</h1>`);
});

app.listen(3000);
