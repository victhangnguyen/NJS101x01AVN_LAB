"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheckout = exports.getOrders = exports.postCartDeleteProduct = exports.postCart = exports.getCart = exports.getIndex = exports.getProduct = exports.getProducts = void 0;
//! Models
const product_1 = __importDefault(require("../models/product"));
const Logging_1 = __importDefault(require("../library/Logging"));
//@ /products => GET
const getProducts = (req, res, next) => {
    Logging_1.default.shop('GET getProducts');
    product_1.default.findAll()
        .then((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
        });
    })
        .catch((err) => console.log(err));
};
exports.getProducts = getProducts;
const getProduct = (req, res, next) => {
    Logging_1.default.shop('GET getProduct');
    const prodId = req.params.productId;
    product_1.default.findByPk(prodId) //! Find By Primary Key
        .then((product) => {
        res.render('shop/product-detail', {
            product: product,
            // pageTitle: product?.getDataValue('title'),
            pageTitle: product === null || product === void 0 ? void 0 : product.title,
            path: '/products',
        });
    })
        .catch((err) => console.log(err));
};
exports.getProduct = getProduct;
const getIndex = (req, res, next) => {
    Logging_1.default.shop('GET getIndex');
    product_1.default.findAll()
        .then((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });
    })
        .catch((err) => console.log(err));
};
exports.getIndex = getIndex;
const getCart = (req, res, next) => {
    var _a;
    Logging_1.default.shop('GET getCart');
    //! User.hasOne(Cart)
    //! User create mixins method createCart and getCart
    // console.log(req.user.cart)
    //! we can't access property cart, but we can call getCart
    (_a = req.user) === null || _a === void 0 ? void 0 : _a.getCart().then((cart) => {
        cart.getProducts().then((cartProducts) => {
            // console.log('hello')
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts,
            });
        });
    }
    //! we can use cart to fetch the Products that inside of it
    ).catch((err) => err);
};
exports.getCart = getCart;
//@ /cart => POST
const postCart = (req, res, next) => {
    var _a;
    Logging_1.default.shop('POST postCart');
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    (_a = req.user) === null || _a === void 0 ? void 0 : _a.getCart().then((cart) => {
        //! find out if product
        fetchedCart = cart;
        return cart.getProducts({ where: { id: prodId } });
    }).then((products) => {
        let product;
        if (products.length > 0) {
            //! already exist product id in Cart
            product = products[0];
        }
        //! if exist product
        if (product) {
            //! get old Quantity fo this product, and then increase it.
            //! return (product + qty)
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
            //! cartItem is extra field that added by Sequelize to give us access to this in-between table.
            //! but to this exact product in the in-between table.
            return product;
        }
        //! no product
        //! we will return a Product (general product data)
        return product_1.default.findByPk(prodId);
    }).then((product) => {
        return fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
        //! return fetchedCart to get access to the Cart, and then addProduct to add Product into in-between table base on id cart
    }).then(() => {
        Logging_1.default.shop('redirect to /cart');
        res.redirect('/cart');
    }).catch((err) => console.log(err));
};
exports.postCart = postCart;
const postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    // //! We can alse use a hidden input to pass the [prop: price] to the backend.
    // //! I think this Ok, If we only pass the [prop: id] through the req and then we do all the data retrieval on the backend.
    // Product.findById(prodId, (product: Product) => {
    //   Cart.deleteProduct(prodId, product.price);
    //   res.redirect('/cart');
    // });
};
exports.postCartDeleteProduct = postCartDeleteProduct;
const getOrders = (req, res, next) => {
    Logging_1.default.shop('GET getOrders');
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
    });
};
exports.getOrders = getOrders;
const getCheckout = (req, res, next) => {
    Logging_1.default.shop('GET getCheckout');
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout',
    });
};
exports.getCheckout = getCheckout;
//# sourceMappingURL=shop.js.map