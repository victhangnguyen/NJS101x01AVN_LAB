import Logging from './library/Logging';
import path from 'path';
import express from 'express';
// import session from 'express-session';
const session = require('express-session');

// const MongoDBStore = require('connect-mongodb-session')(session);
import connectMongoDBSession from 'connect-mongodb-session';
const MongoDBStore = connectMongoDBSession(session);

//! imp database
import mongoose from 'mongoose';

//! imp routes
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';
import authRoutes from './routes/auth';

//! imp models
import User from './models//user';

//! imp controllers
import * as errorController from './controllers/error';

// ! Extending the Request type

declare module 'express-session' {
  export interface SessionData {
    isLoggedIn: boolean;
  }
}

declare global {
  namespace Express {
    export interface Request {
      user?: any;
    }
  }
}

const MONGODB_USERNAME = 'njs101x';
const MONGODB_PASSWORD = 'njs101x';
const DATABASE = 'shop';

const MONGODB_URI = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.nbojriq.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;

//! createExpress -> instance Express()
const app = express();
const store = new MongoDBStore({ uri: MONGODB_URI, collection: 'sessions' });

app.set('view engine', 'ejs');
app.set('views', 'src/views');

//! Register __middlewares
app.use(express.urlencoded({ extended: false }));
const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));
app.use(
  session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

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
app.use(authRoutes);

//! default '/', this will also handle all http methods, GET, POST, DELTE, PATCH, PUT...
app.use(errorController.get404);

//! connect method that takes the URL we used for connecting before
mongoose
  .connect(MONGODB_URI)
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
