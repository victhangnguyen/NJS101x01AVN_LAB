"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheckout = exports.getOrders = exports.postCartDeleteProduct = exports.postCart = exports.getCart = exports.getIndex = exports.getProduct = exports.getProducts = void 0;
//! Models
const product_1 = __importDefault(require("../models/product"));
//@ /products => GET
const getProducts = (req, res, next) => {
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
    const prodId = req.params.productId;
    // Product.findAll({
    //   //! options?: FindOptions<ProductAttributes> | undefined)
    //   where: { id: prodId }, //! Attribute has to be matched for rows to be selected for the given action.
    // })
    //   .then((products) => {
    //     console.log('product: ', products)
    //     res.render('shop/product-detail', {
    //       product: products[0],
    //       // pageTitle: product?.getDataValue('title'),
    //       pageTitle: products[0]?.title,
    //       path: '/products',
    //     });
    //   })
    //   .catch((err) => console.log(err));
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
    // Cart.getCart((cart) => {
    //   Product.fetchAll()
    //     .then(([rows, fieldPacket]) => {
    //       const cartProducts = [];
    //       //! if we have no products in the Cart, then cart products will be an empty Array.
    //       for (const product of rows) {
    //         const cartProductData = cart?.products.find((prod) => prod.id === product.id);
    //         if (cartProductData) {
    //           cartProducts.push({ productData: product, qty: cartProductData.qty });
    //           //! __important This is use for example, with large data, we should use function database
    //         }
    //       }
    //     })
    //     .catch((err) => console.log(err));
    // });
};
exports.getCart = getCart;
const postCart = (req, res, next) => {
    // const prodId: string = req.body.productId;
    // res.redirect('/cart');
    // Product.findById(prodId, (product: Product) => {
    //   Cart.addProduct(product.id!, product.price);
    // });
    // //! get route cart -> render Cart route
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