//! imp library
import Logging from '../library/Logging';

import { RequestHandler } from 'express';

//! Models
import Product from '../models/product';
import Cart from '../models/cart';
import Order from '../models/order';
import OrderItem from '../models/order-item';

//@ /products => GET
export const getProducts: RequestHandler = (req, res, next) => {
  Logging.shop('GET getProducts');
  Product.findAll()
    .then((products) => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
      });
    })
    .catch((err) => console.log(err));
};

export const getProduct: RequestHandler = (req, res, next) => {
  Logging.shop('GET getProduct');
  const prodId = req.params.productId;
  Product.findByPk(prodId) //! Find By Primary Key
    .then((product) => {
      res.render('shop/product-detail', {
        product: product,
        // pageTitle: product?.getDataValue('title'),
        pageTitle: product?.title,
        path: '/products',
      });
    })
    .catch((err) => console.log(err));
};

export const getIndex: RequestHandler = (req, res, next) => {
  Logging.shop('GET getIndex');
  Product.findAll()
    .then((products) => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
      });
    })
    .catch((err) => console.log(err));
};

export const getCart: RequestHandler = (req, res, next) => {
  Logging.shop('GET getCart');
  //! User.hasOne(Cart)
  //! User create mixins method createCart and getCart
  // console.log(req.user.cart)
  //! we can't access property cart, but we can call getCart
  req.user
    ?.getCart()
    .then(
      (cart) => {
        cart.getProducts().then((cartProducts) => {
          // console.log('hello')
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: cartProducts,
          });
        });
      }
      //! we can use cart to fetch the Products that inside of it
    )
    .catch((err) => err);
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
        //! already exist product id in Cart
        product = products[0];
      }
      //! if exist product
      if (product) {
        //! get old Quantity fo this product, and then increase it.
        //! return (product + qty)
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        //! cartItem is extra field that added by Sequelize to give us access to this in-between table.
        //! but to this exact product in the in-between table.
        return product;
      }
      //! no product
      //! we will return a Product (general product data)
      return Product.findByPk(prodId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product!, {
        //! product : {cartItem}
        through: { quantity: newQuantity },
      });
      //! return fetchedCart to get access to the Cart, and then addProduct to add Product into in-between table base on id cart
    })
    .then(() => {
      Logging.shop('redirect to /cart');
      res.redirect('/cart');
    })
    .catch((err) => console.log(err));
};

export const postCartDeleteProduct: RequestHandler = (req, res, next) => {
  Logging.shop('POST postCartDeleteProduct');
  const prodId: string = req.body.productId;

  req.user
    ?.getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const product = products[0];
      product.cartItem.destroy();
    })
    .then((result) => {
      Logging.admin('redirect /cart');
      res.redirect('/cart');
    })
    .catch((err) => err);

  // //! We can alse use a hidden input to pass the [prop: price] to the backend.
  // //! I think this Ok, If we only pass the [prop: id] through the req and then we do all the data retrieval on the backend.

  // Product.findById(prodId, (product: Product) => {
  //   Cart.deleteProduct(prodId, product.price);
  //   res.redirect('/cart');
  // });
};

export const getOrders: RequestHandler = (req, res, next) => {
  Logging.shop('GET getOrders');
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders',
  });
};

//@ /create-order => POST
export const postOrder: RequestHandler = (req, res, next) => {
  Logging.shop('POST postOrder');

  req.user
    ?.getCart()
    .then((cart) => {
      return cart.getProducts();
    })
    .then((products) => {
      return req.user
        ?.createOrder()
        .then((order) => {
          //! this Promise return order
          return order.addProducts(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch((err) => err);
    })
    .then((result) => {
      console.log(result);
      Logging.shop('redirect to /orders');
      res.redirect('/orders');
    })
    .catch((err) => err);
};

export const getCheckout: RequestHandler = (req, res, next) => {
  Logging.shop('GET getCheckout');
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};
