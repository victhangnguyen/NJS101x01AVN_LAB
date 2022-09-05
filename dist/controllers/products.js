"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var postAddProduct = function (req, res, next) {
    var newProduct = { title: req.body.title };
    products.push(newProduct);
    //! Redirect
    res.redirect('/');
};
var getProducts = function (req, res, next) {
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
    });
};
exports.default = {
    getAddProduct: getAddProduct,
    postAddProduct: postAddProduct,
    getProducts: getProducts,
};
//# sourceMappingURL=products.js.map