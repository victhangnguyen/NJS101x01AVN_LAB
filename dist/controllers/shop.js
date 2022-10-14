"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postOrder = exports.getOrders = exports.postCartDeleteProduct = exports.postCart = exports.getCart = exports.getProduct = exports.getProducts = exports.getIndex = void 0;
//! imp library
const Logging_1 = __importDefault(require("../library/Logging"));
//! Models
const product_1 = __importDefault(require("../models/product"));
const order_1 = __importDefault(require("../models/order"));
//@ /=> GET
const getIndex = (req, res, next) => {
    Logging_1.default.infoAsync('GET getIndex', () => {
        product_1.default.find({}) //! QueryWithHelpers<Array<ResultDoc>, ResultDoc, TQueryHelpers, T>
            .then((productDocs) => {
            // console.log('__Debugger__productDocs: ', productDocs);
            res.render('shop/index', {
                path: '/',
                pageTitle: 'Shop',
                prods: productDocs,
                isAuthenticated: req.session.isLoggedIn,
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
                path: '/products',
                pageTitle: 'All Products',
                prods: productDocs,
                isAuthenticated: req.session.isLoggedIn,
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
                path: '/products',
                pageTitle: productDoc === null || productDoc === void 0 ? void 0 : productDoc.title,
                product: productDoc,
                isAuthenticated: req.session.isLoggedIn,
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
    Logging_1.default.infoAsync('GET getCart', () => {
        req.user
            .populate('cart.items.productId') //! return Promise
            .then((user) => {
            // console.log('user.cart.items', user.cart.items)
            const products = user.cart.items;
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products,
                isAuthenticated: req.session.isLoggedIn,
            });
        })
            .catch((err) => {
            console.log(err);
        });
    });
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
    Logging_1.default.infoAsync('POST postCartDeleteProduct', () => {
        var _a;
        const prodId = req.body.productId;
        (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.removeFromCart(prodId).then((userDoc) => {
            console.log('__Debugger postCartDeleteProduct__userDoc (): ', userDoc);
            Logging_1.default.admin('redirect /cart');
            res.redirect('/cart');
        }).catch((err) => {
            console.log(err);
        });
    });
};
exports.postCartDeleteProduct = postCartDeleteProduct;
const getOrders = (req, res, next) => {
    Logging_1.default.infoAsync('GET getOrders', () => {
        order_1.default.find({ 'user.userId': req.session.user._id })
            .then((orderDocs) => {
            console.log('__Debugger__orderDocs: ', orderDocs);
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orderDocs,
                isAuthenticated: req.session.isLoggedIn,
            });
        })
            .catch((err) => {
            console.log(err);
        });
    });
};
exports.getOrders = getOrders;
//@ /create-order => POST
const postOrder = (req, res, next) => {
    Logging_1.default.infoAsync('POST postOrder', () => {
        req.session.user
            .populate('cart.items.productId') //! return Promise
            .then((user) => {
            const products = user.cart.items.map((i) => {
                return { product: { ...i.productId._doc }, quantity: i.quantity }; //! productId is populated it will be object
            });
            const order = new order_1.default({
                products: products,
                user: {
                    name: req.session.user.name,
                    userId: req.session.user, //! this mongoose Object will pick the Id from there
                },
            });
            return order.save();
        })
            .then((result) => {
            console.log('__Debugger__result: ', result);
            return req.session.user.clearCart();
        })
            .then(() => {
            res.redirect('/orders');
        })
            .catch((err) => {
            console.log(err);
        });
    });
};
exports.postOrder = postOrder;
//# sourceMappingURL=shop.js.map