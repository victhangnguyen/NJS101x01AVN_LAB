"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDeleteProduct = exports.postEditProduct = exports.getEditProduct = exports.getProducts = exports.postAddProduct = exports.getAddProduct = void 0;
//! imp library
const Logging_1 = __importDefault(require("../library/Logging"));
//! imp models
const product_1 = __importDefault(require("../models/product"));
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
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new product_1.default(title, price, description, imageUrl);
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
exports.postAddProduct = postAddProduct;
//@ /admin/products => GET
const getProducts = (req, res, next) => {
    Logging_1.default.admin('GET getProducts');
    product_1.default.fetchAll()
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
exports.postEditProduct = postEditProduct;
const postDeleteProduct = (req, res, next) => {
    Logging_1.default.admin('POST postDeleteProduct');
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
exports.postDeleteProduct = postDeleteProduct;
//# sourceMappingURL=admin.js.map