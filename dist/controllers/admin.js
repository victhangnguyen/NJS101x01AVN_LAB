"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDeleteProduct = exports.postEditProduct = exports.getEditProduct = exports.getProducts = exports.postAddProduct = exports.getAddProduct = void 0;
//! imp library
const Logging_1 = __importDefault(require("../library/Logging"));
//! imp models
const product_1 = __importDefault(require("../models/product"));
//@  /admin/add-product => GET
const getAddProduct = (req, res, next) => {
    //! guard clause Route Protection
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    Logging_1.default.infoAsync('GET getAddProduct', () => {
        res.render('admin/edit-product', {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            editing: false,
        });
    });
};
exports.getAddProduct = getAddProduct;
//@ /admin/add-product => POST
const postAddProduct = (req, res, next) => {
    Logging_1.default.admin('POST postAddProduct');
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new product_1.default({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        userId: req.user,
    });
    product
        .save()
        .then((product) => {
        Logging_1.default.infoAsync('Created Product!', () => {
            console.log('__Debugger__product: ', product);
        });
        res.redirect('/products');
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.postAddProduct = postAddProduct;
//@ /admin/products => GET
const getProducts = (req, res, next) => {
    Logging_1.default.infoAsync('GET getProducts', () => {
        product_1.default.find()
            // .select('title price -_id')
            // .populate('userId', 'name')
            .then((productDocs) => {
            console.log('__Debugger__productDocs: ', productDocs);
            res.render('admin/products', {
                path: '/admin/products',
                pageTitle: 'Admin Products',
                prods: productDocs,
            });
        })
            .catch((err) => {
            console.log(err);
        });
    });
};
exports.getProducts = getProducts;
//@ /admin/edit-product/:productId => GET
const getEditProduct = (req, res, next) => {
    Logging_1.default.infoAsync('GET getEditProduct', () => {
        const editMode = req.query.edit;
        if (!editMode) {
            return res.redirect('/');
        }
        const prodId = req.params.productId;
        product_1.default.findById(prodId)
            .then((productDoc) => {
            console.log('__Debugger__productDoc: ', productDoc);
            res.render('admin/edit-product', {
                path: '/admin/edit-product',
                pageTitle: 'Edit Product',
                product: productDoc,
                editing: editMode,
            });
        })
            .catch((err) => {
            console.log(err);
        });
    });
};
exports.getEditProduct = getEditProduct;
//@ /admin/edit-product/:productId => POST
const postEditProduct = (req, res, next) => {
    Logging_1.default.infoAsync('POST postEditProduct', () => {
        const prodId = req.body.productId;
        const updatedTitle = req.body.title;
        const updatedPrice = req.body.price;
        const updatedImageUrl = req.body.imageUrl;
        const updatedDesc = req.body.description;
        const updatedUserId = req.body.userId;
        product_1.default.findById(prodId)
            .then((productDoc) => {
            // console.log('__Debugger__productDoc: ', productDoc);
            productDoc.title = updatedTitle;
            productDoc.price = updatedPrice;
            productDoc.description = updatedDesc;
            productDoc.imageUrl = updatedImageUrl;
            return productDoc === null || productDoc === void 0 ? void 0 : productDoc.save();
        })
            .then((productDoc) => {
            Logging_1.default.infoAsync('Updated Product', () => {
                console.log('__Debugger__productDoc: ', productDoc);
                res.redirect(`/admin/products`);
            });
        })
            .catch((err) => {
            console.log(err);
        });
    });
};
exports.postEditProduct = postEditProduct;
//@ /admin/delete-product => POST
const postDeleteProduct = (req, res, next) => {
    Logging_1.default.infoAsync('POST postDeleteProduct', () => {
        const prodId = req.body.productId;
        product_1.default.findByIdAndRemove(prodId) //! this is a built-in method provided by mongoose that should remove a Document
            .then((deletedDoc) => {
            //! product is an instance of this Model
            Logging_1.default.infoAsync('Deleted Product!', () => {
                console.log('__debugger__deletedDoc: ', deletedDoc);
                res.redirect('/admin/products');
            });
        })
            .catch((err) => console.log(err));
    });
};
exports.postDeleteProduct = postDeleteProduct;
//# sourceMappingURL=admin.js.map