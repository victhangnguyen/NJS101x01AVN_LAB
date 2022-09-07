import { RequestHandler } from 'express';
//! Models
import Product from '../models/product';
import Cart from '../models/cart';

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
  Product.findById(prodId, (product: Product) => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products',
    });
  });
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

export const postCart: RequestHandler = (req, res, next) => {
  const prodId = req.body.productId;
  res.redirect('/cart');

  Product.findById(prodId, (product: Product) => {
    Cart.addProduct(product.id, product.price); 
  });
  //! get route cart -> render Cart route
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
