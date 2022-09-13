import { RequestHandler } from 'express';
//! imp Models
import Product from '../models/product';
//! imp Types
import { ProductAttributes } from '../models/product';

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
  const title: ProductAttributes['title'] = req.body.title;
  const imageUrl: ProductAttributes['imageUrl'] = req.body.imageUrl;
  const price: ProductAttributes['price'] = req.body.price;
  const description: ProductAttributes['description'] = req.body.description;

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
  Product.findAll()
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
      });
    })
    .then((err) => console.log(err));
};

export const getEditProduct: RequestHandler = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId: ProductAttributes['id'] = Number(req.params.productId);
  Product.findByPk(prodId)
    .then((product) => {
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
  const prodId = req.body.productId;
  // Product.deleteById(prodId);
  res.redirect('/admin/products');
};
