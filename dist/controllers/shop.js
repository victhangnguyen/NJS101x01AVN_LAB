"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheckout = exports.postOrder = exports.getOrders = exports.postCartDeleteProduct = exports.postCart = exports.getCart = exports.getIndex = exports.getProduct = exports.getProducts = void 0;
//! imp library
const Logging_1 = __importDefault(require("../library/Logging"));
//! Models
const product_1 = __importDefault(require("../models/product"));
//@ /products => GET
const getProducts = (req, res, next) => {
    Logging_1.default.shop('GET getProducts');
    product_1.default.fetchAll()
        .then((products) => {
        console.log(products);
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
        });
    })
        .catch((err) => {
        console.log(err);
    });
    // Product.findAll()
    //   .then((products) => {
    //     res.render('shop/product-list', {
    //       prods: products,
    //       pageTitle: 'All Products',
    //       path: '/products',
    //     });
    //   })
    //   .catch((err) => console.log(err));
};
exports.getProducts = getProducts;
const getProduct = (req, res, next) => {
    Logging_1.default.shop('GET getProduct');
    // const prodId = req.params.productId;
    // Product.findByPk(prodId) //! Find By Primary Key
    //   .then((product) => {
    //     res.render('shop/product-detail', {
    //       product: product,
    //       // pageTitle: product?.getDataValue('title'),
    //       pageTitle: product?.title,
    //       path: '/products',
    //     });
    //   })
    //   .catch((err) => console.log(err));
};
exports.getProduct = getProduct;
const getIndex = (req, res, next) => {
    Logging_1.default.shop('GET getIndex');
    // Product.findAll()
    //   .then((products) => {
    //     res.render('shop/index', {
    //       prods: products,
    //       pageTitle: 'Shop',
    //       path: '/',
    //     });
    //   })
    //   .catch((err) => console.log(err));
};
exports.getIndex = getIndex;
const getCart = (req, res, next) => {
    Logging_1.default.shop('GET getCart');
    // req.user
    //   ?.getCart()
    //   .then(
    //     (cart) => {
    //       cart.getProducts().then((cartProducts) => {
    //         // console.log('hello')
    //         res.render('shop/cart', {
    //           path: '/cart',
    //           pageTitle: 'Your Cart',
    //           products: cartProducts,
    //         });
    //       });
    //     }
    //     //! we can use cart to fetch the Products that inside of it
    //   )
    //   .catch((err) => err);
};
exports.getCart = getCart;
//@ /cart => POST
const postCart = (req, res, next) => {
    Logging_1.default.shop('POST postCart');
    // const prodId = req.body.productId;
    // let fetchedCart: Cart;
    // let newQuantity = 1;
    // req.user
    //   ?.getCart()
    //   .then((cart) => {
    //     //! find out if product
    //     fetchedCart = cart;
    //     return cart.getProducts({ where: { id: prodId } });
    //   })
    //   .then((products) => {
    //     let product;
    //     if (products.length > 0) {
    //       //! already exist product id in Cart
    //       product = products[0];
    //     }
    //     //! if exist product
    //     if (product) {
    //       //! get old Quantity fo this product, and then increase it.
    //       //! return (product + qty)
    //       const oldQuantity = product.cartItem.quantity;
    //       newQuantity = oldQuantity + 1;
    //       //! cartItem is extra field that added by Sequelize to give us access to this in-between table.
    //       //! but to this exact product in the in-between table.
    //       return product;
    //     }
    //     //! no product
    //     //! we will return a Product (general product data)
    //     return Product.findByPk(prodId);
    //   })
    //   .then((product) => {
    //     return fetchedCart.addProduct(product!, {
    //       //! product : {cartItem}
    //       through: { quantity: newQuantity },
    //     });
    //     //! return fetchedCart to get access to the Cart, and then addProduct to add Product into in-between table base on id cart
    //   })
    //   .then(() => {
    //     Logging.shop('redirect to /cart');
    //     res.redirect('/cart');
    //   })
    //   .catch((err) => console.log(err));
};
exports.postCart = postCart;
const postCartDeleteProduct = (req, res, next) => {
    Logging_1.default.shop('POST postCartDeleteProduct');
    // const prodId: string = req.body.productId;
    // req.user
    //   ?.getCart()
    //   .then((cart) => {
    //     return cart.getProducts({ where: { id: prodId } });
    //   })
    //   .then((products) => {
    //     const product = products[0];
    //     product.cartItem.destroy();
    //   })
    //   .then((result) => {
    //     Logging.admin('redirect /cart');
    //     res.redirect('/cart');
    //   })
    //   .catch((err) => err);
};
exports.postCartDeleteProduct = postCartDeleteProduct;
const getOrders = (req, res, next) => {
    Logging_1.default.shop('GET getOrders');
    // req.user
    //   ?.getOrders({ include: ['products'] })
    //   //! __Eager__Loading
    //   .then((orders) => {
    //     console.log('__orders: ', orders); //! We have an Array of Orders
    //     res.render('shop/orders', {
    //       path: '/orders',
    //       pageTitle: 'Your Orders',
    //       orders: orders,
    //     });
    //   })
    //   .catch((err) => err);
};
exports.getOrders = getOrders;
//@ /create-order => POST
const postOrder = (req, res, next) => {
    Logging_1.default.shop('POST postOrder');
    // let fetchedCart: Cart;
    // req.user
    //   ?.getCart()
    //   .then((cart) => {
    //     fetchedCart = cart;
    //     return cart.getProducts();
    //   })
    //   .then((products) => {
    //     return req.user
    //       ?.createOrder()
    //       .then((order) => {
    //         //! this Promise return order
    //         return order.addProducts(
    //           products.map((product) => {
    //             product.orderItem = { quantity: product.cartItem.quantity };
    //             return product;
    //           })
    //         );
    //       })
    //       .catch((err) => err);
    //   })
    //   .then((result) => {
    //     return fetchedCart.setProducts(null!);
    //   })
    //   .then((result) => {
    //     Logging.shop('redirect to /orders');
    //     res.redirect('/orders');
    //   })
    //   .catch((err) => err);
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