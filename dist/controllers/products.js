"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.postAddProduct = exports.getAddProduct = void 0;
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
    var newProduct = { title: req.body.title };
    products.push(newProduct);
    //! Redirect
    res.redirect('/');
};
exports.postAddProduct = postAddProduct;
var getProducts = function (req, res, next) {
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
    });
};
exports.getProducts = getProducts;
// export default {
//   getAddProduct,
//   postAddProduct,
//   getProducts,
// };
//# sourceMappingURL=products.js.map