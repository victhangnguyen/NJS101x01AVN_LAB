import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import { CURRENT_USER_ID } from '../app';
import bycrypt from 'bcryptjs';

//! imp library
import Logging from '../library/Logging';

//! imp models
import User, { IUser, IUserDocument } from '../models/user';

export const getLogin: RequestHandler = (req, res, next) => {
  // const isLoggedIn =
  //   req.get('Cookie')?.split(';')[0].trim().split('=')[1] === 'true';
  console.log(
    '__Debugger__ctrls__auth__getLogin__req.session.isLoggedIn: ',
    req.session.isLoggedIn
  );

  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false,
  });
};

//@ /signup => GET
export const getSignup: RequestHandler = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false,
  });
};

//@ /login => POST
export const postLogin: RequestHandler = (req, res, next) => {
  User.findById(CURRENT_USER_ID)
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err) => {
        console.log(' req.session.save[err] :', err);
        res.redirect('/');
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
