"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEditProduct = exports.getProducts = exports.postAddProduct = exports.getAddProduct = void 0;
const product_1 = __importDefault(require("../models/product"));
const getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
    });
};
exports.getAddProduct = getAddProduct;
const postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new product_1.default(title, imageUrl, description, price);
    product.save();
    res.redirect('/');
};
exports.postAddProduct = postAddProduct;
const getProducts = (req, res, next) => {
    product_1.default.fetchAll((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
        });
    });
};
exports.getProducts = getProducts;
const getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    console.log(editMode);
    if (!editMode) {
        return res.redirect('/');
        //! Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    }
    const prodId = req.params.productId;
    product_1.default.findById(prodId, (product) => {
        if (!product) {
            return res.redirect('/'); //! send response and out callback.
        }
        res.render('admin/edit-product', {
            product: product,
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
        });
    });
};
exports.getEditProduct = getEditProduct;
//# sourceMappingURL=admin.js.map