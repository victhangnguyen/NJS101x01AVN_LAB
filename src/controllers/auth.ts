import { RequestHandler } from 'express';
import User, { IUser } from '../models/user';
import { CURRENT_USER_ID } from '../app';
import Logging from '../library/Logging';

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

export const postLogin: RequestHandler = (req, res, next) => {
  User.findById(CURRENT_USER_ID) //! if find successful.
    .then((userDoc: IUser | null) => {
      req.session.isLoggedIn = true;
      req.session.user = userDoc!;
      res.redirect('/');
    })
    .catch((err: Error) => {
      console.log(err);
    });
};

//@ /logout => POST
export const postLogout: RequestHandler = (req, res, next) => {
  req.session.destroy((err: Error) => {
    Logging.success('LOGOUT -> clear session!')
    console.log(err);
    res.redirect('/');
  });
};
