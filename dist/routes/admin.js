"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//! core modules
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var path_2 = __importDefault(require("../utils/path"));
var router = express_1.default.Router();
var products = [];
var pathFile = path_1.default.join(path_2.default, 'views', 'add-product.html');
//! /admin/add-product/ => GET
router.get('/add-product', function (req, res, next) {
    // res.sendFile(pathFile);
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
    });
});
//! /admin/add-product/ => POST
router.post('/add-product', function (req, res, next) {
    //! add new Product object to productsArray
    //! set req.body type by TypeCasting
    var newProduct = { title: req.body.title };
    products.push(newProduct);
    //! Redirect
    res.redirect('/');
});
// exports.routes = router;
// exports.products = products;
exports.default = { routes: router, products: products };
//# sourceMappingURL=admin.js.map