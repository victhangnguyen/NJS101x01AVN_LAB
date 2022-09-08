"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDeleteProduct = exports.postEditProduct = exports.getEditProduct = exports.getProducts = exports.postAddProduct = exports.getAddProduct = void 0;
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
    const product = new product_1.default(null, title, imageUrl, description, price);
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
    if (!editMode) {
        return res.redirect('/');
        //! Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
        //! Solution: add return
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
const postEditProduct = (req, res, next) => {
    //! fetch information for the product
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    //! create a new product instance that already have existing Id
    //! populate it with that information
    const updatedProduct = new product_1.default(prodId, updatedTitle, updatedImageUrl, updatedDesc, updatedPrice);
    //! call save()
    updatedProduct.save();
    //! res
    res.redirect(`/admin/products`);
    // res.redirect(`/admin/edit-product/${prodId}?edit=true`);
};
exports.postEditProduct = postEditProduct;
const postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    console.log(prodId);
};
exports.postDeleteProduct = postDeleteProduct;
//# sourceMappingURL=admin.js.map