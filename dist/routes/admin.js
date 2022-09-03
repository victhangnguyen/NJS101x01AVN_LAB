"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var products = [];
//! /admin/add-product/ => GET
router.get('/add-product', function (req, res, next) {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
    });
});
//! /admin/add-product/ => POST
router.post('/add-product', function (req, res, next) {
    var newProduct = { title: req.body.title };
    products.push(newProduct);
    //! Redirect
    res.redirect('/');
});
exports.default = { routes: router, products: products };
//# sourceMappingURL=admin.js.map