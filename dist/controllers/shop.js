"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheckout = exports.getOrders = exports.getCart = exports.getIndex = exports.getProduct = exports.getProducts = void 0;
//! Models
var product_1 = __importDefault(require("../models/product"));
var getProducts = function (req, res, next) {
    product_1.default.fetchAll(function (products) {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
        });
    });
};
exports.getProducts = getProducts;
var getProduct = function (req, res, next) {
    //! extract that Dynamic path segment
    var prodId = req.params.productId;
    console.log(prodId);
    res.redirect('/');
};
exports.getProduct = getProduct;
var getIndex = function (req, res, next) {
    product_1.default.fetchAll(function (products) {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });
    });
};
exports.getIndex = getIndex;
var getCart = function (req, res, next) {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
    });
};
exports.getCart = getCart;
var getOrders = function (req, res, next) {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
    });
};
exports.getOrders = getOrders;
var getCheckout = function (req, res, next) {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout',
    });
};
exports.getCheckout = getCheckout;
//# sourceMappingURL=shop.js.map