import { RequestHandler } from 'express';
//! Models
import Product from '../models/product';
import Cart from '../models/cart';
import { BelongsToMany } from 'sequelize';

//@ /products => GET
export const getProducts: RequestHandler = (req, res, next) => {
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
  const prodId = req.params.productId;
  // Product.findAll({
  //   //! options?: FindOptions<ProductAttributes> | undefined)
  //   where: { id: prodId }, //! Attribute has to be matched for rows to be selected for the given action.
  // })
  //   .then((products) => {
  //     console.log('product: ', products)
  //     res.render('shop/product-detail', {
  //       product: products[0],
  //       // pageTitle: product?.getDataValue('title'),
  //       pageTitle: products[0]?.title,
  //       path: '/products',
  //     });
  //   })
  //   .catch((err) => console.log(err));
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
  //! User.hasOne(Cart)
  //! User create mixins method createCart and getCart
  // console.log(req.user.cart)
  //! we can't access property cart, but we can call getCart
  req.user
    ?.getCart()
    .then(
      (cart) =>
        cart.getProducts().then((cartProducts) => {
          // console.log('hello')
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: cartProducts,
          });
        })
      //! we can use cart to fetch the Products that inside of it
    )
    .catch((err) => err);
};

//@ /cart => POST
export const postCart: RequestHandler = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart: Cart;

  req.user
    ?.getCart()
    .then((cart) => {
      //! find out if product
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      let newQuantity = 1;
      if (products.length > 0) {
        //! already exist product id in Cart
        product = products[0];
      }
      //! if exist product
      if (product) {
        //! get old Quantity fo this product, and then increase it.
        //! return (product + qty)
      }
      //! no product
      //! we will return a Product (general product data)
      return Product.findByPk(prodId)
        .then((product) => {
          //! we add a new product with
          return fetchedCart.addProduct(product!, { through: { quantity: newQuantity } });
        })
        .catch((err) => err);
    })
    .then((param) => console.log('params: ', param))
    .catch((err) => console.log(err));
  // const prodId: string = req.body.productId;
  // res.redirect('/cart');
  // Product.findById(prodId, (product: Product) => {
  //   Cart.addProduct(product.id!, product.price);
  // });
  // //! get route cart -> render Cart route
};

export const postCartDeleteProduct: RequestHandler = (req, res, next) => {
  const prodId: string = req.body.productId;
  // //! We can alse use a hidden input to pass the [prop: price] to the backend.
  // //! I think this Ok, If we only pass the [prop: id] through the req and then we do all the data retrieval on the backend.

  // Product.findById(prodId, (product: Product) => {
  //   Cart.deleteProduct(prodId, product.price);
  //   res.redirect('/cart');
  // });
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
