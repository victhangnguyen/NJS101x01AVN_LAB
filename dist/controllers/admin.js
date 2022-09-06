"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.postAddProduct = exports.getAddProduct = void 0;
var product_1 = __importDefault(require("../models/product"));
var getAddProduct = function (req, res, next) {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
    });
};
exports.getAddProduct = getAddProduct;
var postAddProduct = function (req, res, next) {
    var title = req.body.title;
    var imageUrl = req.body.imageUrl;
    var price = req.body.price;
    var description = req.body.description;
    var product = new product_1.default(title, imageUrl, description, price);
    product.save();
    res.redirect('/');
};
exports.postAddProduct = postAddProduct;
var getProducts = function (req, res, next) {
    product_1.default.fetchAll(function (products) {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
        });
    });
};
exports.getProducts = getProducts;
//# sourceMappingURL=admin.js.map