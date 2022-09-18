//! imp library
import Logging from '../library/Logging';

import { RequestHandler } from 'express';
//! imp Models
import Product from '../models/product';
//! imp Types
import { ProductAttributes } from '../models/product';

//! GET admin/add-product -> Render page
export const getAddProduct: RequestHandler = (req, res, next) => {
  Logging.admin('GET getAddProduct');
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

//! POST admin/add-product
export const postAddProduct: RequestHandler = (req, res, next) => {
  Logging.admin('POST postAddProduct');

  const title: ProductAttributes['title'] = req.body.title;
  const imageUrl: ProductAttributes['imageUrl'] = req.body.imageUrl;
  const price: ProductAttributes['price'] = req.body.price;
  const description: ProductAttributes['description'] = req.body.description;
  // const userId: ProductAttributes['userId'] = req.user!.id;

  req.user
    ?.createProduct({
      title: title,
      imageUrl: imageUrl,
      price: price,
      description: description,
    })
    .then((result) => {
      console.log('CREATED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};

//@ /admin/products => GET
export const getProducts: RequestHandler = (req, res, next) => {
  Logging.admin('GET getProducts');

  // Product.findAll();
  req.user
    ?.getProducts()
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
      });
    })
    .then((err) => console.log(err));
};

//@ /admin/edit-product/:productId => GET
export const getEditProduct: RequestHandler = (req, res, next) => {
  Logging.admin('GET getEditProduct');

  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId: ProductAttributes['id'] = Number(req.params.productId);
  // Product.findByPk(prodId);
  req.user
    ?.getProducts({ where: { id: prodId } })
    .then((products) => {
      const product = products[0];
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        product: product,
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
      });
    })
    .catch((err) => console.log(err));
};

export const postEditProduct: RequestHandler = (req, res, next) => {
  Logging.admin('POST postEditProduct');

  const prodId: ProductAttributes['id'] = req.body.productId;
  const updatedTitle: ProductAttributes['title'] = req.body.title;
  const updatedPrice: ProductAttributes['price'] = req.body.price;
  const updatedImageUrl: ProductAttributes['imageUrl'] = req.body.imageUrl;
  const updatedDesc: ProductAttributes['description'] = req.body.description;

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
};

export const postDeleteProduct: RequestHandler = (req, res, next) => {
  Logging.admin('POST postDeleteProduct');

  const prodId = req.body.productId;
  // Product.destroy({where}); //! Way 2: DELETE options
  //! options?: DestroyOptions<ProductAttributes> | undefined
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
};
