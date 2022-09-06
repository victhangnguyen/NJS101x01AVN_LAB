import { RequestHandler } from 'express';
//! Models
import Product from '../models/product';

export const getProducts: RequestHandler = (req, res, next) => {
  Product.fetchAll((products: Array<Product>) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
    });
  });
};

export const getProduct: RequestHandler = (req, res, next) => {
  //! extract that Dynamic path segment
  const prodId = req.params.productId;
  console.log(prodId);
  res.redirect('/');
};

export const getIndex: RequestHandler = (req, res, next) => {
  Product.fetchAll((products: Array<Product>) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });
  });
};

export const getCart: RequestHandler = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
  });
};

export const getOrders: RequestHandler = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders',
  });
};

export const getCheckout: RequestHandler = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};
