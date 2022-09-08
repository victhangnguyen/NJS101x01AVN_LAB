import { RequestHandler } from 'express';
import Product from '../models/product';

export const getAddProduct: RequestHandler = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

export const postAddProduct: RequestHandler = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

export const getProducts: RequestHandler = (req, res, next) => {
  Product.fetchAll((products: Array<Product>) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    });
  });
};

export const getEditProduct: RequestHandler = (req, res, next) => {
  const editMode = req.query.edit;
  console.log(editMode);

  if (!editMode) {
    return res.redirect('/');
    //! Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
  }

  const prodId = req.params.productId;
  Product.findById(prodId, (product: Product) => {
    if (!product) {
      return res.redirect('/'); //! send response and out callback.
    }

    res.render('admin/edit-product', {
      product: product,
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
    });
  });
};