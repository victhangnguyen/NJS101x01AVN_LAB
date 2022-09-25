"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheckout = exports.postOrder = exports.getOrders = exports.postCartDeleteProduct = exports.postCart = exports.getCart = exports.getProduct = exports.getProducts = exports.getIndex = void 0;
//! imp library
const Logging_1 = __importDefault(require("../library/Logging"));
//! Models
const product_1 = __importDefault(require("../models/product"));
//@ /=> GET
const getIndex = (req, res, next) => {
    Logging_1.default.infoAsync('GET getIndex', () => {
        product_1.default.find({}) //! QueryWithHelpers<Array<ResultDoc>, ResultDoc, TQueryHelpers, T>
            .then((productDocs) => {
            // console.log('__Debugger__productDocs: ', productDocs);
            res.render('shop/index', {
                prods: productDocs,
                pageTitle: 'Shop',
                path: '/',
            });
        })
            .catch((err) => console.log(err));
    });
};
exports.getIndex = getIndex;
//@ /products => GET
const getProducts = (req, res, next) => {
    Logging_1.default.infoAsync('GET getProducts', () => {
        product_1.default.find({})
            .then((productDocs) => {
            // console.log('__Debugger__productDocs: ', productDocs);
            res.render('shop/product-list', {
                prods: productDocs,
                pageTitle: 'All Products',
                path: '/products',
            });
        })
            .catch((err) => {
            console.log(err);
        });
    });
};
exports.getProducts = getProducts;
//@ /products/:productId => GET
//! Render Details Product
const getProduct = (req, res, next) => {
    Logging_1.default.infoAsync('GET getProduct', () => {
        const prodId = req.params.productId;
        product_1.default.findById(prodId)
            .then((productDoc) => {
            console.log('__Debugger__productDoc: ', productDoc);
            res.render('shop/product-detail', {
                product: productDoc,
                pageTitle: productDoc === null || productDoc === void 0 ? void 0 : productDoc.title,
                path: '/products',
            });
        })
            .catch((err) => {
            console.log(err);
        });
    });
};
exports.getProduct = getProduct;
//@ /cart => GET
const getCart = (req, res, next) => {
    Logging_1.default.shop('GET getCart');
    // req.user
    //   ?.getCart()
    //   .then((products) => {
    //     // console.log('__Debugger__productDocs: ', products);
    //     res.render('shop/cart', {
    //       path: '/cart',
    //       pageTitle: 'Your Cart',
    //       products: products,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
};
exports.getCart = getCart;
//@ /cart => POST
const postCart = (req, res, next) => {
    Logging_1.default.infoAsync('POST postCart', () => {
        const prodId = req.body.productId;
        product_1.default.findById(prodId)
            .then((productDoc) => {
            var _a;
            return (_a = req.user) === null || _a === void 0 ? void 0 : _a.addToCart(productDoc);
        })
            .then((result) => {
            res.redirect('/cart');
        })
            .catch((err) => {
            console.log(err);
        });
    });
};
exports.postCart = postCart;
const postCartDeleteProduct = (req, res, next) => {
    Logging_1.default.shop('POST postCartDeleteProduct');
    // const prodId: string = (req.body as { productId: string }).productId;
    // req.user
    //   ?.deleteItemFromCart(prodId)
    //   .then((result) => {
    //     // console.log('__Debugger__result: ', result);
    //     Logging.admin('redirect /cart');
    //     res.redirect('/cart');
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
};
exports.postCartDeleteProduct = postCartDeleteProduct;
const getOrders = (req, res, next) => {
    Logging_1.default.shop('GET getOrders');
    // req.user
    //   ?.getOrders()
    //   .then((orderDocs) => {
    //     res.render('shop/orders', {
    //       path: '/orders',
    //       pageTitle: 'Your Orders',
    //       orders: orderDocs,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
};
exports.getOrders = getOrders;
//@ /create-order => POST
const postOrder = (req, res, next) => {
    Logging_1.default.shop('POST postOrder');
    // req.user
    //   ?.addOrder()
    //   .then((orderDoc) => {
    //     console.log('__Debugger__orderDoc ', orderDoc);
    //     Logging.shop('redirect to /orders');
    //     res.redirect('/orders');
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
};
exports.postOrder = postOrder;
const getCheckout = (req, res, next) => {
    Logging_1.default.shop('GET getCheckout');
    // res.render('shop/checkout', {
    //   path: '/checkout',
    //   pageTitle: 'Checkout',
    // });
};
exports.getCheckout = getCheckout;
//# sourceMappingURL=shop.js.map