import Logging from './library/Logging';
import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';

//! import Routes
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';

//! an instance of the app object
const app = express();

//! Register Middlewares
app.use(express.urlencoded({ extended: false }));

//! implementing Routes
app.use(shopRoutes);
app.use('/admin', adminRoutes);

//! default '/', this will also handle all http methods, GET, POST, DELTE, PATCH, PUT...
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send(`<h1>PAGE NOT FOUND</h1>`);
});

//! 404 Error
//! We simply have to add a Catch all Middleware at the Bottom

app.listen(3000);
