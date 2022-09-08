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
  const title: Product['title'] = req.body.title;
  const imageUrl: Product['imageUrl'] = req.body.imageUrl;
  const price: Product['price'] = req.body.price;
  const description: Product['description'] = req.body.description;

  const product: Product = new Product(null, title, imageUrl, description, price);

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

  if (!editMode) {
    return res.redirect('/');
    //! Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    //! Solution: add return
  }

  const prodId: Product['id'] = req.params.productId;
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

export const postEditProduct: RequestHandler = (req, res, next) => {
  //! fetch information for the product
  const prodId: Product['id'] = req.body.productId;
  const updatedTitle: Product['title'] = req.body.title;
  const updatedPrice: Product['price'] = req.body.price;
  const updatedImageUrl: Product['imageUrl'] = req.body.imageUrl;
  const updatedDesc: Product['description'] = req.body.description;

  //! create a new product instance that already have existing Id
  //! populate it with that information
  const updatedProduct: Product = new Product(prodId, updatedTitle, updatedImageUrl, updatedDesc, updatedPrice);

  //! call save()
  updatedProduct.save();
  //! res
  res.redirect(`/admin/products`);
  // res.redirect(`/admin/edit-product/${prodId}?edit=true`);
};
