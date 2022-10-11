import { RequestHandler } from 'express';

export const getLogin: RequestHandler = (req, res, next) => {
  // const isLoggedIn =
  //   req.get('Cookie')?.split(';')[0].trim().split('=')[1] === 'true';
  console.log('__Debugger__ctrls__auth__getLogin__req.session.isLoggedIn: ', req.session.isLoggedIn);

  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false,
  });
};

export const postLogin: RequestHandler = (req, res, next) => {
  req.session.isLoggedIn = true;
  res.redirect('/');
};
