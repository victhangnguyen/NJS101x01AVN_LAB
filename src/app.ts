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
app.use(adminRoutes);

app.listen(3000);
