"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheckout = exports.getOrders = exports.postCart = exports.getCart = exports.getIndex = exports.getProduct = exports.getProducts = void 0;
//! Models
const product_1 = __importDefault(require("../models/product"));
const cart_1 = __importDefault(require("../models/cart"));
const getProducts = (req, res, next) => {
    product_1.default.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
        });
    });
};
exports.getProducts = getProducts;
const getProduct = (req, res, next) => {
    //! extract that Dynamic path segment
    const prodId = req.params.productId;
    product_1.default.findById(prodId, (product) => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products',
        });
    });
};
exports.getProduct = getProduct;
const getIndex = (req, res, next) => {
    product_1.default.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });
    });
};
exports.getIndex = getIndex;
const getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
    });
};
exports.getCart = getCart;
const postCart = (req, res, next) => {
    const prodId = req.body.productId;
    res.redirect('/cart');
    product_1.default.findById(prodId, (product) => {
        cart_1.default.addProduct(product.id, product.price);
    });
    //! get route cart -> render Cart route
};
exports.postCart = postCart;
const getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
    });
};
exports.getOrders = getOrders;
const getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout',
    });
};
exports.getCheckout = getCheckout;
//# sourceMappingURL=shop.js.map