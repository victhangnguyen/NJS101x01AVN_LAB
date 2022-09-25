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
import mongoose from 'mongoose';

// ! Extending the Request type
declare global {
  namespace Express {
    export interface Request {
      user?: any;
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
  Logging.infoAsync('Authentication', () => {
    const currentUserId = '632fe0941cb168613f986706';
    User.findById(currentUserId)
      .then((userDoc) => {
        req.user = userDoc; //! Mongoose Model Object
        next();
      })
      .catch((err) => err);
  });
});

//! implementing Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes); //! default: '/'

//! default '/', this will also handle all http methods, GET, POST, DELTE, PATCH, PUT...
app.use(errorController.get404);

const MONGODB_USERNAME = 'njs101x';
const MONGODB_PASSWORD = 'njs101x';
const DATABASE = 'shop';

//! connect method that takes the URL we used for connecting before
mongoose
  .connect(
    `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.nbojriq.mongodb.net/${DATABASE}?retryWrites=true&w=majority`
  )
  .then((mongooseConnection) => {
    // console.log('__Debugger__mongooseConnection: ', mongooseConnection);
    const initialCart = {
      items: [],
      total: 0,
    };

    User.findOne({})
      .then((userDoc) => {
        if (!userDoc) {
          const user = new User({
            name: 'thangncfx16840',
            email: 'thangncfx16840@funix.edu.vn',
            cart: initialCart,
          });

          user.save();
        }
      })
      .catch((err) => {
        console.log(err);
      });

    const PORT = 3000;
    app.listen(PORT, () => {
      Logging.info('Server is running in port ' + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
