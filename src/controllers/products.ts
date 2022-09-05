import { RequestHandler } from 'express';
import { Product } from '../models/product';

//! initialize Product Store
const products: Product[] = [];

//! get AddProduct page
// exports.getAddProduct...
export const getAddProduct: RequestHandler = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

export const postAddProduct: RequestHandler = (req, res, next) => {
  const newProduct = { title: (req.body as { title: string }).title };

  products.push(newProduct);
  //! Redirect
  res.redirect('/');
};

export const getProducts: RequestHandler = (req, res, next) => {
  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
  });
};

// export default {
//   getAddProduct,
//   postAddProduct,
//   getProducts,
// };
