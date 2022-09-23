"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDeleteProduct = exports.postEditProduct = exports.getEditProduct = exports.getProducts = exports.postAddProduct = exports.getAddProduct = void 0;
//! imp library
const Logging_1 = __importDefault(require("../library/Logging"));
//@  /admin/add-product => GET
const getAddProduct = (req, res, next) => {
    Logging_1.default.admin('GET getAddProduct');
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
    });
};
exports.getAddProduct = getAddProduct;
//@ /admin/add-product => POST
const postAddProduct = (req, res, next) => {
    Logging_1.default.admin('POST postAddProduct');
    // const userId: mongoDB.ObjectId | undefined = req.user?._id;
    // const title: IProduct['title'] = req.body.title;
    // const imageUrl: IProduct['imageUrl'] = req.body.imageUrl;
    // const price: IProduct['price'] = req.body.price;
    // const description: IProduct['description'] = req.body.description;
    // const product = new Product(
    //   title,
    //   price,
    //   description,
    //   imageUrl,
    //   null,
    //   userId!
    // );
    // product
    //   .save()
    //   .then((result) => {
    //     Logging.info('CREATED PRODUCT');
    //     res.redirect('/admin/products');
    //   })
    //   .catch((err) => {
    //     console.log('Error: ', err);
    //   });
};
exports.postAddProduct = postAddProduct;
//@ /admin/products => GET
const getProducts = (req, res, next) => {
    Logging_1.default.admin('GET getProducts');
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
exports.getProducts = getProducts;
//@ /admin/edit-product/:productId => GET
const getEditProduct = (req, res, next) => {
    Logging_1.default.admin('GET getEditProduct');
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
exports.getEditProduct = getEditProduct;
const postEditProduct = (req, res, next) => {
    Logging_1.default.admin('POST postEditProduct');
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
exports.postEditProduct = postEditProduct;
const postDeleteProduct = (req, res, next) => {
    Logging_1.default.admin('POST postDeleteProduct');
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
exports.postDeleteProduct = postDeleteProduct;
//# sourceMappingURL=admin.js.map