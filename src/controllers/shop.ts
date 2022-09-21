//! imp library
import Logging from '../library/Logging';

import { RequestHandler } from 'express';

//! Models
import Product from '../models/product';
import Cart from '../models/cart';
import Order from '../models/order';
import OrderItem from '../models/order-item';
import { ObjectId } from 'mongodb';

//@ /products => GET
export const getProducts: RequestHandler = (req, res, next) => {
  Logging.shop('GET getProducts');

  Product.fetchAll()
    .then((products) => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//! Render Details Product
export const getProduct: RequestHandler = (req, res, next) => {
  Logging.shop('GET getProduct');

  const prodId: string = (req.params as { productId: string }).productId;

  Product.findById(prodId)
    .then((product) => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product?.title,
        path: '/products',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getIndex: RequestHandler = (req, res, next) => {
  Logging.shop('GET getIndex');

  Product.fetchAll()
    .then((productDocs) => {
      res.render('shop/index', {
        prods: productDocs,
        pageTitle: 'Shop',
        path: '/',
      });
    })
    .catch((err) => console.log(err));
};

export const getCart: RequestHandler = (req, res, next) => {
  Logging.shop('GET getCart');
  // req.user
  //   ?.getCart()
  //   .then(
  //     (cart) => {
  //       cart.getProducts().then((cartProducts) => {
  //         // console.log('hello')
  //         res.render('shop/cart', {
  //           path: '/cart',
  //           pageTitle: 'Your Cart',
  //           products: cartProducts,
  //         });
  //       });
  //     }
  //     //! we can use cart to fetch the Products that inside of it
  //   )
  //   .catch((err) => err);
};

//@ /cart => POST
export const postCart: RequestHandler = (req, res, next) => {
  Logging.shop('POST postCart');
  const prodId = req.body.productId;
  let fetchedCart: Cart;
  let newQuantity = 1;

  req.user
    ?.getCart()
    .then((cart) => {
      //! find out if product
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product!, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      Logging.shop('redirect to /cart');
      res.redirect('/cart');
    })
    .catch((err) => console.log(err));
};

export const postCartDeleteProduct: RequestHandler = (req, res, next) => {
  Logging.shop('POST postCartDeleteProduct');
  // const prodId: string = req.body.productId;

  // req.user
  //   ?.getCart()
  //   .then((cart) => {
  //     return cart.getProducts({ where: { id: prodId } });
  //   })
  //   .then((products) => {
  //     const product = products[0];
  //     product.cartItem.destroy();
  //   })
  //   .then((result) => {
  //     Logging.admin('redirect /cart');
  //     res.redirect('/cart');
  //   })
  //   .catch((err) => err);
};

export const getOrders: RequestHandler = (req, res, next) => {
  Logging.shop('GET getOrders');

  // req.user
  //   ?.getOrders({ include: ['products'] })
  //   //! __Eager__Loading
  //   .then((orders) => {
  //     console.log('__orders: ', orders); //! We have an Array of Orders
  //     res.render('shop/orders', {
  //       path: '/orders',
  //       pageTitle: 'Your Orders',
  //       orders: orders,
  //     });
  //   })
  //   .catch((err) => err);
};

//@ /create-order => POST
export const postOrder: RequestHandler = (req, res, next) => {
  Logging.shop('POST postOrder');
  // let fetchedCart: Cart;

  // req.user
  //   ?.getCart()
  //   .then((cart) => {
  //     fetchedCart = cart;
  //     return cart.getProducts();
  //   })
  //   .then((products) => {
  //     return req.user
  //       ?.createOrder()
  //       .then((order) => {
  //         //! this Promise return order
  //         return order.addProducts(
  //           products.map((product) => {
  //             product.orderItem = { quantity: product.cartItem.quantity };
  //             return product;
  //           })
  //         );
  //       })
  //       .catch((err) => err);
  //   })
  //   .then((result) => {
  //     return fetchedCart.setProducts(null!);
  //   })
  //   .then((result) => {
  //     Logging.shop('redirect to /orders');
  //     res.redirect('/orders');
  //   })
  //   .catch((err) => err);
};

export const getCheckout: RequestHandler = (req, res, next) => {
  Logging.shop('GET getCheckout');
  // res.render('shop/checkout', {
  //   path: '/checkout',
  //   pageTitle: 'Checkout',
  // });
};
