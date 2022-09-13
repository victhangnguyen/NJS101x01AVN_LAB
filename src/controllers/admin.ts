import { RequestHandler } from 'express';
import Product from '../models/product';

//! GET admin/add-product -> Render page
export const getAddProduct: RequestHandler = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

//! POST admin/add-product
export const postAddProduct: RequestHandler = (req, res, next) => {
  const title: string = req.body.title;
  const imageUrl: string = req.body.imageUrl;
  const price: number = req.body.price;
  const description: string = req.body.description;

  //! Builds a new model instance and calls save on it.
  //! create method that creates a new Element based on that Model an immediately saves it to the Database
  Product.create({
    //! We don't need to assign an ID, that will be managed automatically
    title,
    imageUrl,
    price,
    description,
  })
    .then((result) => console.log('Created Product!'))
    .catch((err) => console.log(err));

  res.redirect('/');
};

export const getProducts: RequestHandler = (req, res, next) => {
  // Product.fetchAll((products: Array<Product>) => {
  //   res.render('admin/products', {
  //     prods: products,
  //     pageTitle: 'Admin Products',
  //     path: '/admin/products',
  //   });
  // });
};

export const getEditProduct: RequestHandler = (req, res, next) => {
  // const editMode = req.query.edit;
  // if (!editMode) {
  //   return res.redirect('/');
  //   //! Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
  //   //! Solution: add return
  // }
  // const prodId: Product['id'] = req.params.productId;
  // Product.findById(prodId, (product: Product) => {
  //   if (!product) {
  //     return res.redirect('/'); //! send response and out callback.
  //   }
  //   res.render('admin/edit-product', {
  //     product: product,
  //     pageTitle: 'Edit Product',
  //     path: '/admin/edit-product',
  //     editing: editMode,
  //   });
  // });
};

export const postEditProduct: RequestHandler = (req, res, next) => {
  //! fetch information for the product
  const prodId: number = req.body.productId;
  const updatedTitle: string = req.body.title;
  const updatedPrice: number = req.body.price;
  const updatedImageUrl: number = req.body.imageUrl;
  const updatedDesc: number = req.body.description;

  //! create a new product instance that already have existing Id
  //! populate it with that information
  // const updatedProduct: Product = new Product(prodId, updatedTitle, updatedPrice, updatedImageUrl, updatedDesc);

  //! call save()
  // updatedProduct.save();

  //! res
  res.redirect(`/admin/products`);
  // res.redirect(`/admin/edit-product/${prodId}?edit=true`);
};

export const postDeleteProduct: RequestHandler = (req, res, next) => {
  const prodId = req.body.productId;
  // Product.deleteById(prodId);
  res.redirect('/admin/products');
};
