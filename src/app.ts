import path from 'path';
import express from 'express';
// import session from 'express-session';

//! imp library
import Logging from './library/Logging';

//! imp database + app server
import mongoose from 'mongoose';
// const MongoDBStore = require('connect-mongodb-session')(session);
const session = require('express-session');
import connectMongoDBSession from 'connect-mongodb-session';
const MongoDBStore = connectMongoDBSession(session);
//! CSRF
import csrf from 'csurf';
//! Flash
import flash from 'connect-flash';

//! imp routes
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';
import authRoutes from './routes/auth';

//! imp models
import User, { IUser } from './models//user';

//! imp controllers
import * as errorController from './controllers/error';

// ! Extending the Request type

declare module 'express-session' {
  export interface SessionData {
    isLoggedIn: boolean;
    user: any;
    destroy: any;
  }
}

declare global {
  namespace Express {
    export interface Request {
      user?: any;
    }
  }
}

export const CURRENT_USER_ID = '632fe0941cb168613f986706';

const MONGODB_USERNAME = 'njs101x';
const MONGODB_PASSWORD = 'njs101x';
const DATABASE = 'shop';

const MONGODB_URI = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.nbojriq.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;

//! createExpress -> instance Express()
const app = express();
const store = new MongoDBStore({ uri: MONGODB_URI, collection: 'sessions' });
const csrfProtection = csrf();

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
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id) //! if find successful.
    .then((userDoc: IUser | null) => {
      req.user = userDoc;
      next();
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
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
    const PORT = 3000;
    app.listen(PORT, () => {
      Logging.info('Server is running in port ' + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
