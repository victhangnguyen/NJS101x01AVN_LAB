import { RequestHandler } from 'express';
import Product from '../models/product';

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
  const title = (req.body as { title: string }).title;

  const product = new Product(title);

  product.save();

  //! Redirect
  res.redirect('/');
};

export const getProducts: RequestHandler = (req, res, next) => {
  Product.fetchAll((products: Array<Product>) => {
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });
  });

  console.log('Controllers -> products: ', products);
};

// export default {
//   getAddProduct,
//   postAddProduct,
//   getProducts,
// };
