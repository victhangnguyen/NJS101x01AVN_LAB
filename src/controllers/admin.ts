import mongoose from 'mongoose';
import fs from 'fs';

//! imp library
import Logging from '../library/Logging';

import mongoDB from 'mongodb';

import { RequestHandler } from 'express';

//! imp models
import Product, { IProduct, IProductDocument } from '../models/product';

//@  /admin/add-product => GET
export const getAddProduct: RequestHandler = (req, res, next) => {
  Logging.infoAsync('GET getAddProduct', () => {
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false,
      isAuthenticated: req.session.isLoggedIn, //! true/false
    });
  });
};

//@ /admin/add-product => POST
export const postAddProduct: RequestHandler = (req, res, next) => {
  Logging.admin('POST postAddProduct');
  const title: IProduct['title'] = req.body.title;
  const imageUrl: IProduct['imageUrl'] = req.body.imageUrl;
  const price: IProduct['price'] = req.body.price;
  const description: IProduct['description'] = req.body.description;

  const product: IProductDocument = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user,
  });

  product
    .save()
    .then((product: IProductDocument) => {
      Logging.infoAsync('Created Product!', () => {
        console.log('__Debugger__product: ', product);
      });
      res.redirect('/products');
    })
    .catch((err) => {
      console.log(err);
    });
};

//@ /admin/products => GET
export const getProducts: RequestHandler = (req, res, next) => {
  Logging.infoAsync('GET getProducts', () => {
    Product.find()
      // .select('title price -_id')
      // .populate('userId', 'name')
      .then((productDocs) => {
        console.log('__Debugger__productDocs: ', productDocs);
        res.render('admin/products', {
          path: '/admin/products',
          pageTitle: 'Admin Products',
          prods: productDocs,
          isAuthenticated: req.session.isLoggedIn,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

//@ /admin/edit-product/:productId => GET
export const getEditProduct: RequestHandler = (req, res, next) => {
  Logging.infoAsync('GET getEditProduct', () => {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect('/');
    }
    const prodId: string = (req.params as { productId: string }).productId;

    Product.findById(prodId)
      .then((productDoc) => {
        console.log('__Debugger__productDoc: ', productDoc);
        res.render('admin/edit-product', {
          path: '/admin/edit-product',
          pageTitle: 'Edit Product',
          product: productDoc,
          editing: editMode,
          isAuthenticated: req.session.isLoggedIn,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

//@ /admin/edit-product/:productId => POST
export const postEditProduct: RequestHandler = (req, res, next) => {
  Logging.infoAsync('POST postEditProduct', () => {
    const prodId: string = (req.body as { productId: string }).productId;

    const updatedTitle: string = req.body.title;
    const updatedPrice: number = req.body.price;
    const updatedImageUrl: string = req.body.imageUrl;
    const updatedDesc: string = req.body.description;
    const updatedUserId = req.body.userId;

    Product.findById(prodId)
      .then((productDoc) => {
        // console.log('__Debugger__productDoc: ', productDoc);
        productDoc!.title = updatedTitle;
        productDoc!.price = updatedPrice;
        productDoc!.description = updatedDesc;
        productDoc!.imageUrl = updatedImageUrl;

        return productDoc?.save();
      })
      .then((productDoc) => {
        Logging.infoAsync('Updated Product', () => {
          console.log('__Debugger__productDoc: ', productDoc);
          res.redirect(`/admin/products`);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

//@ /admin/delete-product => POST
export const postDeleteProduct: RequestHandler = (req, res, next) => {
  Logging.infoAsync('POST postDeleteProduct', () => {
    const prodId: string = (req.body as { productId: string }).productId;

    Product.findByIdAndRemove(prodId) //! this is a built-in method provided by mongoose that should remove a Document
      .then((deletedDoc) => {
        //! product is an instance of this Model
        Logging.infoAsync('Deleted Product!', () => {
          console.log('__debugger__deletedDoc: ', deletedDoc);
          res.redirect('/admin/products');
        });
      })
      .catch((err) => console.log(err));
  });
};
