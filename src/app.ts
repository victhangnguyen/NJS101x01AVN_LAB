import Logging from './library/Logging';
import path from 'path';
import express from 'express';

//! imp routes
// import adminRoutes from './routes/admin';
// import shopRoutes from './routes/shop';

//! imp controllers
import * as errorController from './controllers/error';

//! imp models
import Product from './models/product';
import User from './models//user';
import Cart from './models/cart';
import CartItem from './models/cart-item';
import Order from './models/order';
import OrderItem from './models/order-item';

//! imp database
import mongoConnect from './utils/database';

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

app.use((req, res, next) => {
  //! Register user id 1
  // User.findByPk(1)
  //   .then((user) => {
  //     //! Store it in a Request, we will set request.user
  //     req.user = user!;
  //     next();
  //   })
  //   .catch((err) => err);
});

//! implementing Routes
// app.use('/admin', adminRoutes);
// app.use(shopRoutes); //! default: '/'

//! default '/', this will also handle all http methods, GET, POST, DELTE, PATCH, PUT...
app.use(errorController.get404);

mongoConnect(client => {
  console.log(client)
  app.listen(3000);
})
  
//! then<void, never>(onfulfilled?: ((value: Sequelize) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<...>
//! catch(onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>

