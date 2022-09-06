"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.postAddProduct = exports.getAddProduct = void 0;
var product_1 = __importDefault(require("../models/product"));
//! initialize Product Store
var products = [];
//! get AddProduct page
// exports.getAddProduct...
var getAddProduct = function (req, res, next) {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
    });
};
exports.getAddProduct = getAddProduct;
var postAddProduct = function (req, res, next) {
    var title = req.body.title;
    var product = new product_1.default(title);
    product.save();
    //! Redirect
    res.redirect('/');
};
exports.postAddProduct = postAddProduct;
var getProducts = function (req, res, next) {
    product_1.default.fetchAll(function (products) {
        res.render('shop', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });
        console.log('Controllers -> products: ', products);
    });
};
exports.getProducts = getProducts;
//# sourceMappingURL=products.js.map