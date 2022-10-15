import { RequestHandler } from 'express';

//! exports.get404()
export const get404: RequestHandler = (req, res, next) => {
  res.render('404', {
    path: '',
    pageTitle: 'Page Not Found',
  });
};
