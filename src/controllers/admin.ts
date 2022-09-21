//! imp library
import Logging from '../library/Logging';

import { RequestHandler } from 'express';
import * as mongoDB from 'mongodb';

//! imp models
import Product from '../models/product';

//@  /admin/add-product => GET
export const getAddProduct: RequestHandler = (req, res, next) => {
  Logging.admin('GET getAddProduct');
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

//@ /admin/add-product => POST
export const postAddProduct: RequestHandler = (req, res, next) => {
  Logging.admin('POST postAddProduct');

  const title: Product['title'] = req.body.title;
  const imageUrl: Product['imageUrl'] = req.body.imageUrl;
  const price: Product['price'] = req.body.price;
  const description: Product['description'] = req.body.description;

  const product = new Product(title, price, description, imageUrl);

  product
    .save()
    .then((result) => {
      console.log('insertedObject: ', result);
      res.redirect('/admin/products');
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
};

//@ /admin/products => GET
export const getProducts: RequestHandler = (req, res, next) => {
  Logging.admin('GET getProducts');

  Product.fetchAll()
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//@ /admin/edit-product/:productId => GET
export const getEditProduct: RequestHandler = (req, res, next) => {
  Logging.admin('GET getEditProduct');

  // const editMode = req.query.edit;
  // if (!editMode) {
  //   return res.redirect('/');
  // }
  // const prodId: string = (req.params as { productId: string }).productId;

  // Product.findById(prodId)
  //   .then((product) => {
  //     console.log('__product: ', product);
  //     res.render('admin/edit-product', {
  //       product: product,
  //       pageTitle: 'Edit Product',
  //       path: '/admin/edit-product',
  //       editing: editMode,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

export const postEditProduct: RequestHandler = (req, res, next) => {
  /*
  Logging.admin('POST postEditProduct');

  const prodId: Product['id'] = req.body.productId;
  const updatedTitle: Product['title'] = req.body.title;
  const updatedPrice: Product['price'] = req.body.price;
  const updatedImageUrl: Product['imageUrl'] = req.body.imageUrl;
  const updatedDesc: Product['description'] = req.body.description;

  //! Updating Product
  Product.findByPk(prodId)
    .then((product) => {
      product!.title = updatedTitle;
      product!.price = updatedPrice;
      product!.imageUrl = updatedImageUrl;
      product!.description = updatedDesc;

      //! save(): choose product with id and save() with exist id
      //! and if the product does not exist, it will create a new one, but it happen, it will override or update the old one with our new values.
      return product!.save(); //! return Product to continue then
      //! Returns a Promise that resolves to the saved instance (or rejects with a Sequelize.ValidationError,
      //! which will have a property for each of the fields for which the validation failed, with the error message for that field).
    })
    .then((result) => {
      console.log('UPDATED PRODUCT!');
      res.redirect(`/admin/products`);
    })
    .catch((err) => console.log(err));
  */
};

export const postDeleteProduct: RequestHandler = (req, res, next) => {
  Logging.admin('POST postDeleteProduct');
  /*

  const prodId = req.body.productId;
  // Product.destroy({where}); //! Way 2: DELETE options
  //! options?: DestroyOptions<Product> | undefined
  //! Delete multiple instances, or set their deletedAt timestamp to the current time if paranoid is enabled.
  Product.findByPk(prodId)
    .then((product) => {
      //! product is an instance of this Model
      return product?.destroy(); //! Promise
    })
    .then((result) => {
      console.log('DELETED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
  */
};
