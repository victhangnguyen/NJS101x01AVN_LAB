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
}
exports.default = Cart;
//# sourceMappingURL=cart.js.map