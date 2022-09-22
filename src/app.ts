import Logging from './library/Logging';
import path from 'path';
import express from 'express';

//! imp routes
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';

//! imp controllers
import * as errorController from './controllers/error';

//! imp models
import Product from './models/product';
import User from './models//user';
// import Order from './models/order';
// import OrderItem from './models/order-item';

//! imp database
import { mongoConnect } from './utils/database';
import mongoDB from 'mongodb';

// ! Extending the Request type
declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}

//! createExpress -> instance Express()
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');

//! Register Middlewares
app.use(express.urlencoded({ extended: false }));

//! app.ts => root Directory : src
const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));

//! Authentication
app.use((req, res, next) => {
  Logging.info('Authentication');

  const currentUserId = '632addf9a3992a1b7aa059f4';
  User.findById(currentUserId)
    .then((userDoc) => {
      //! Store it in a Request, we will set request.user
      console.log('__Debugger__req.user.cart: ', userDoc!.cart)
      req.user = new User(
        userDoc!.name,
        userDoc!.email,
        userDoc!.cart,
        userDoc!._id
      );
      next();
    })
    .catch((err) => err);
});

//! implementing Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes); //! default: '/'

//! default '/', this will also handle all http methods, GET, POST, DELTE, PATCH, PUT...
app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});
