import mongoose from 'mongoose';
import fs from 'fs';

//! imp library
import Logging from '../library/Logging';

import mongoDB from 'mongodb';

import { RequestHandler } from 'express';

//! imp models
import Product, { IProduct } from '../models/product';

//@  /admin/add-product => GET
export const getAddProduct: RequestHandler = (req, res, next) => {
  Logging.infoAsync('GET getAddProduct', () => {
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false,
    });
  });
};

//@ /admin/add-product => POST
export const postAddProduct: RequestHandler = (req, res, next) => {
  Logging.admin('POST postAddProduct');

  const userId: mongoDB.ObjectId | undefined = req.user?._id;

  const title: IProduct['title'] = req.body.title;
  const imageUrl: IProduct['imageUrl'] = req.body.imageUrl;
  const price: IProduct['price'] = req.body.price;
  const description: IProduct['description'] = req.body.description;

  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
  });

  product
    .save()
    .then((product) => {
      Logging.infoAsync('Created Product!', () => {
        console.log('__Debugger__product: ', product);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//@ /admin/products => GET
export const getProducts: RequestHandler = (req, res, next) => {
  Logging.admin('GET getProducts');

  // Product.fetchAll()
  //   .then((products) => {
  //     res.render('admin/products', {
  //       prods: products,
  //       pageTitle: 'Admin Products',
  //       path: '/admin/products',
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
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
  Logging.admin('POST postEditProduct');

  // const prodId: string = (req.body as { productId: string }).productId;

  // const updatedTitle: string = req.body.title;
  // const updatedPrice: number = req.body.price;
  // const updatedImageUrl: string = req.body.imageUrl;
  // const updatedDesc: string = req.body.description;
  // const updatedUserId = req.body.userId;

  // //! Updating Product

  // const updatedProduct = new Product(
  //   updatedTitle,
  //   updatedPrice,
  //   updatedDesc,
  //   updatedImageUrl,
  //   prodId!,
  //   updatedUserId
  // );

  // return updatedProduct
  //   .save()
  //   .then((result) => {
  //     Logging.info('UPDATED PRODUCT');
  //     res.redirect(`/admin/products`);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

export const postDeleteProduct: RequestHandler = (req, res, next) => {
  Logging.admin('POST postDeleteProduct');

  // const prodId: string = (req.body as { productId: string }).productId;
  // Product.deleteById(prodId)
  //   .then((deleteResult) => {
  //     //! product is an instance of this Model
  //     Logging.info('DELETED PRODUCT!');
  //     console.log('deleteResult: ', deleteResult);
  //     res.redirect('/admin/products');
  //   })
  //   .catch((err) => console.log(err));
};
