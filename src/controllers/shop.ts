//! imp library
import Logging from '../library/Logging';

import { RequestHandler } from 'express';

//! Models
import Product from '../models/product';
// import { ICart } from '../models/user';

// import Order from '../models/order';
// import OrderItem from '../models/order-item';
import * as mongoDB from 'mongodb';

//@ /products => GET
export const getProducts: RequestHandler = (req, res, next) => {
  Logging.shop('GET getProducts');

  // Product.fetchAll()
  //   .then((products) => {
  //     res.render('shop/product-list', {
  //       prods: products,
  //       pageTitle: 'All Products',
  //       path: '/products',
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

//! Render Details Product
export const getProduct: RequestHandler = (req, res, next) => {
  Logging.shop('GET getProduct');

  // const prodId: string = (req.params as { productId: string }).productId;

  // Product.findById(prodId)
  //   .then((product) => {
  //     res.render('shop/product-detail', {
  //       product: product,
  //       pageTitle: product?.title,
  //       path: '/products',
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

export const getIndex: RequestHandler = (req, res, next) => {
  Logging.shop('GET getIndex');

  // Product.fetchAll()
  //   .then((productDocs) => {
  //     res.render('shop/index', {
  //       prods: productDocs,
  //       pageTitle: 'Shop',
  //       path: '/',
  //     });
  //   })
  //   .catch((err) => console.log(err));
};

//@ /cart => GET
export const getCart: RequestHandler = (req, res, next) => {
  Logging.shop('GET getCart');
  // req.user
  //   ?.getCart()
  //   .then((products) => {
  //     // console.log('__Debugger__productDocs: ', products);
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       products: products,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

//@ /cart => POST
export const postCart: RequestHandler = (req, res, next) => {
  Logging.shop('POST postCart');

  // const prodId = req.body.productId;

  // Product.findById(prodId)
  //   .then((productDoc) => {
  //     return req.user?.addToCart(productDoc!);
  //   })
  //   .then((result) => {
  //     res.redirect('/cart');
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

export const postCartDeleteProduct: RequestHandler = (req, res, next) => {
  Logging.shop('POST postCartDeleteProduct');
  // const prodId: string = (req.body as { productId: string }).productId;

  // req.user
  //   ?.deleteItemFromCart(prodId)
  //   .then((result) => {
  //     // console.log('__Debugger__result: ', result);
  //     Logging.admin('redirect /cart');
  //     res.redirect('/cart');
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

export const getOrders: RequestHandler = (req, res, next) => {
  Logging.shop('GET getOrders');

  // req.user
  //   ?.getOrders()
  //   .then((orderDocs) => {
  //     res.render('shop/orders', {
  //       path: '/orders',
  //       pageTitle: 'Your Orders',
  //       orders: orderDocs,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

//@ /create-order => POST
export const postOrder: RequestHandler = (req, res, next) => {
  Logging.shop('POST postOrder');

  // req.user
  //   ?.addOrder()
  //   .then((orderDoc) => {
  //     console.log('__Debugger__orderDoc ', orderDoc);
  //     Logging.shop('redirect to /orders');
  //     res.redirect('/orders');
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

export const getCheckout: RequestHandler = (req, res, next) => {
  Logging.shop('GET getCheckout');
  // res.render('shop/checkout', {
  //   path: '/checkout',
  //   pageTitle: 'Checkout',
  // });
};
