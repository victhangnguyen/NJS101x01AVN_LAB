"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
//! get src directory
const p = path_1.default.join(path_1.default.dirname((_a = require.main) === null || _a === void 0 ? void 0 : _a.filename), 'data', 'cart.json');
class Cart {
    //! GET Products
    static getCart(callbackFn) {
        fs_1.default.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent.toString());
            if (err) {
                callbackFn(null);
            }
            else {
                callbackFn(cart);
            }
        }); //! async
    }
    static addProduct(id, productPrice) {
        //!_1. Fetch the previousCart
        fs_1.default.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent.toString());
            }
            //!_2. Analyze the Cart => Find the existing product
            const existingProductIndex = cart.products.findIndex((prod) => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            //! if exist product =>> update product, else add new productCart
            let updatedProduct;
            //!_3. Add new product / increase the Quantity into Cart
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products]; //!__???
                cart.products[existingProductIndex] = updatedProduct;
            }
            else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            //! storing cart to cart.json file
            fs_1.default.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            });
        });
    }
    //! delete Product into Cart
    static deleteProduct(id, productPrice) {
        //! we need [param] productPrice, because We'll need update the total cart price.
        fs_1.default.readFile(p, (err, fileContent) => {
            //! guard clause
            if (err) {
                return;
            }
            const cart = JSON.parse(fileContent.toString());
            const updatedCart = { ...cart };
            //! This wil be fixed later - "cart" don't exist here. We will need to parse that from fileContent.
            const product = updatedCart.products.find((prod) => prod.id === id);
            //! guard clause
            if (!product)
                return;
            const productQty = product.qty;
            //! and now, I can update my cart products here.
            updatedCart.products = updatedCart.products.filter((prod) => prod.id !== id);
            updatedCart.totalPrice = cart.totalPrice - productPrice * productQty; //! qty: 3, it should be reduced by the product price times three
            fs_1.default.writeFile(p, JSON.stringify(updatedCart), (err) => {
                console.log(err);
            });
        });
    }
}
exports.default = Cart;
//# sourceMappingURL=cart.js.map