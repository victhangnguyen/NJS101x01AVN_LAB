//! imp library
import Logging from '../library/Logging';

import { RequestHandler } from 'express';

//! Models
import Product from '../models/product';
import User, { IUser, IUserDocument, ICartItem } from '../models/user';
import Order, {
  IOrder,
  IOrderDocument,
  IOrderModel,
  IOrderProduct,
} from '../models/order';

// import Order from '../models/order';
// import OrderItem from '../models/order-item';
import mongoose from 'mongoose';

//@ /=> GET
export const getIndex: RequestHandler = (req, res, next) => {
  Logging.infoAsync('GET getIndex', () => {
    Product.find({}) //! QueryWithHelpers<Array<ResultDoc>, ResultDoc, TQueryHelpers, T>
      .then((productDocs) => {
        // console.log('__Debugger__productDocs: ', productDocs);

        res.render('shop/index', {
          path: '/',
          pageTitle: 'Shop',
          prods: productDocs,
          isAuthenticated: req.session.isLoggedIn,
          csrfToken: req.csrfToken()
        });
      })
      .catch((err) => console.log(err));
  });
};

//@ /products => GET
export const getProducts: RequestHandler = (req, res, next) => {
  Logging.infoAsync('GET getProducts', () => {
    Product.find({})
      .then((productDocs) => {
        // console.log('__Debugger__productDocs: ', productDocs);
        res.render('shop/product-list', {
          path: '/products',
          pageTitle: 'All Products',
          prods: productDocs,
          isAuthenticated: req.session.isLoggedIn,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

//@ /products/:productId => GET
//! Render Details Product
export const getProduct: RequestHandler = (req, res, next) => {
  Logging.infoAsync('GET getProduct', () => {
    const prodId: string = (req.params as { productId: string }).productId;

    Product.findById(prodId)
      .then((productDoc) => {
        console.log('__Debugger__productDoc: ', productDoc);
        res.render('shop/product-detail', {
          path: '/products',
          pageTitle: productDoc?.title,
          product: productDoc,
          isAuthenticated: req.session.isLoggedIn,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

//@ /cart => GET
export const getCart: RequestHandler = (req, res, next) => {
  Logging.infoAsync('GET getCart', () => {
    req.user
      .populate('cart.items.productId') //! return Promise
      .then((user: any) => {
        // console.log('user.cart.items', user.cart.items)
        const products = user.cart.items;
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: products,
          isAuthenticated: req.session.isLoggedIn,
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
  });
};

//@ /cart => POST
export const postCart: RequestHandler = (req, res, next) => {
  Logging.infoAsync('POST postCart', () => {
    const prodId = req.body.productId;

    Product.findById(prodId)
      .then((productDoc) => {
        return req.user?.addToCart(productDoc!);
      })
      .then((result) => {
        res.redirect('/cart');
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export const postCartDeleteProduct: RequestHandler = (req, res, next) => {
  Logging.infoAsync('POST postCartDeleteProduct', () => {
    const prodId = req.body.productId;

    req.session.user
      ?.removeFromCart(prodId)
      .then((userDoc: IUserDocument) => {
        console.log('__Debugger postCartDeleteProduct__userDoc (): ', userDoc);
        Logging.admin('redirect /cart');
        res.redirect('/cart');
      })
      .catch((err: any) => {
        console.log(err);
      });
  });
};

export const getOrders: RequestHandler = (req, res, next) => {
  Logging.infoAsync('GET getOrders', () => {
    Order.find({ 'user.userId': req.session.user._id })
      .then((orderDocs) => {
        console.log('__Debugger__orderDocs: ', orderDocs);
        res.render('shop/orders', {
          path: '/orders',
          pageTitle: 'Your Orders',
          orders: orderDocs,
          isAuthenticated: req.session.isLoggedIn,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

//@ /create-order => POST
export const postOrder: RequestHandler = (req, res, next) => {
  Logging.infoAsync('POST postOrder', () => {
    req.session.user
      .populate('cart.items.productId') //! return Promise
      .then((user: any) => {
        const products = user.cart.items.map((i: any) => {
          return { product: { ...i.productId._doc }, quantity: i.quantity }; //! productId is populated it will be object
        });

        const order = new Order({
          products: products,
          user: {
            name: req.session.user.name,
            userId: req.session.user, //! this mongoose Object will pick the Id from there
          },
        });
        return order.save();
      })
      .then((result: any) => {
        console.log('__Debugger__result: ', result);
        return req.session.user.clearCart();
      })
      .then(() => {
        res.redirect('/orders');
      })
      .catch((err: any) => {
        console.log(err);
      });
  });
};
