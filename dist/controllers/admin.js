"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDeleteProduct = exports.postEditProduct = exports.getEditProduct = exports.getProducts = exports.postAddProduct = exports.getAddProduct = void 0;
//! imp library
const Logging_1 = __importDefault(require("../library/Logging"));
const mongoDB = __importStar(require("mongodb"));
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
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    product_1.default.findById(prodId)
        .then((product) => {
        console.log('__product: ', product);
        res.render('admin/edit-product', {
            product: product,
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
        });
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.getEditProduct = getEditProduct;
const postEditProduct = (req, res, next) => {
    Logging_1.default.admin('POST postEditProduct');
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    //! Updating Product
    const updatedProduct = new product_1.default(updatedTitle, updatedPrice, updatedDesc, updatedImageUrl, new mongoDB.ObjectId(prodId));
    return updatedProduct
        .save()
        .then((result) => {
        console.log('UPDATED PRODUCT');
        res.redirect(`/admin/products`);
    })
        .catch((err) => {
        console.log(err);
    });
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