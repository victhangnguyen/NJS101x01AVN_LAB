import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import { CURRENT_USER_ID } from '../app';
import bycrypt from 'bcryptjs';

//! imp library
import Logging from '../library/Logging';

//! imp models
import User, { IUser, IUserDocument } from '../models/user';

export const getLogin: RequestHandler = (req, res, next) => {
  let message: any = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message,
  });
};

//@ /signup => GET
export const getSignup: RequestHandler = (req, res, next) => {
  let message: any = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message,
  });
};

//@ /login => POST
export const postLogin: RequestHandler = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        //! throw Error : No existing email or username with connect-flash
        req.flash('error', 'Invalid email or password!');
        return res.redirect('/login');
      }
      //! If the email exists, then validate the password
      bycrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            //! if true
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(' req.session.save[err] :', err);
              res.redirect('/');
            });
          }
          res.redirect('/login');
        })
        .catch((err) => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch((err) => console.log(err));
};

//@ /signup => POST
export const postSignup: RequestHandler = (req, res, next) => {
  //! create a new User
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  //! find out if a user with that email exists
  User.findOne({ email: email })
    .then((userDoc): any => {
      if (userDoc) {
        req.flash(
          'error',
          'E-mail exists already, please pick a diferent one.'
        );
        return res.redirect('/signup');
      }
      //! currenty a value of 12 is accepted as hightly secure, this function is an asynchronous
      return bycrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });

          return user.save();
        })
        .then((result) => {
          //! success action then redirect to login
          res.redirect('/login');
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

//@ /logout => POST
export const postLogout: RequestHandler = (req, res, next) => {
  req.session.destroy((err: Error) => {
    console.log(err);
    res.redirect('/');
  });
};
