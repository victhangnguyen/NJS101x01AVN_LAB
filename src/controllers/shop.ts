import { RequestHandler } from 'express';
//! Models
import Product from '../models/product';
import Cart from '../models/cart';

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
  // Cart.getCart((cart) => {
  //   Product.fetchAll()
  //     .then(([rows, fieldPacket]) => {
  //       const cartProducts = [];
  //       //! if we have no products in the Cart, then cart products will be an empty Array.
  //       for (const product of rows) {
  //         const cartProductData = cart?.products.find((prod) => prod.id === product.id);
  //         if (cartProductData) {
  //           cartProducts.push({ productData: product, qty: cartProductData.qty });
  //           //! __important This is use for example, with large data, we should use function database
  //         }
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // });
};

export const postCart: RequestHandler = (req, res, next) => {
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
