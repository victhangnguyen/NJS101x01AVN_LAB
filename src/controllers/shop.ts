import { RequestHandler } from 'express';
//! Models
import Product from '../models/product';
import Cart from '../models/cart';

export const getProducts: RequestHandler = (req, res, next) => {
  // Product.fetchAll((products: Array<Product>) => {
  //   res.render('shop/product-list', {
  //     prods: products,
  //     pageTitle: 'All Products',
  //     path: '/products',
  //   });
  // });
};

export const getProduct: RequestHandler = (req, res, next) => {
  // //! extract that Dynamic path segment
  // const prodId = req.params.productId;
  // Product.findById(prodId, (product: Product) => {
  //   res.render('shop/product-detail', {
  //     product: product,
  //     pageTitle: product.title,
  //     path: '/products',
  //   });
  // });
};

export const getIndex: RequestHandler = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldPacket]) => {
      //! [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]]
      res.render('shop/index', {
        prods: rows,
        pageTitle: 'Shop',
        path: '/',
      });
      console.log(rows)
    })
    .catch((err) => console.log(err));
};

export const getCart: RequestHandler = (req, res, next) => {
  // Cart.getCart((cart) => {
  //   Product.fetchAll((products: Array<Product>) => {
  //     const cartProducts = [];
  //     //! if we have no products in the Cart, then cart products will be an empty Array.
  //     for (const product of products) {
  //       const cartProductData = cart?.products.find((prod) => prod.id === product.id);
  //       if (cartProductData) {
  //         cartProducts.push({ productData: product, qty: cartProductData.qty });
  //         //! __important This is use for example, with large data, we should use function database
  //       }
  //     }
  //     console.log(cartProducts);
  //     res.render('shop/cart', {
  //       products: cartProducts,
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //     });
  //   });
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
