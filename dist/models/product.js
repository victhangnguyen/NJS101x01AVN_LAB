"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const p = path_1.default.join(path_1.default.dirname((_a = require.main) === null || _a === void 0 ? void 0 : _a.filename), //! main src
'data', 'products.json');
//! Helper Funcction
const getProductsFromFile = (callbackFn) => {
    fs_1.default.readFile(p, (err, dataBuffer) => {
        //! fulfilled
        if (err) {
            callbackFn([]);
        }
        else {
            callbackFn(JSON.parse(dataBuffer.toString()));
        }
    });
};
class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        // this.title = title;
        // this.imageUrl = imageUrl;
        // this.description = description;
        // this.price = price;
    }
    save() {
        //! init productId
        this.id = Math.random().toString();
        getProductsFromFile((products) => {
            //! callbackFn return Array<Product>
            products.push(this);
            fs_1.default.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }
    static fetchAll(callbackFn) {
        getProductsFromFile(callbackFn);
    }
    static findById(id, callbackFn) {
        getProductsFromFile((products) => {
            const product = products.find((prod) => prod.id === id); //! just find first element
            callbackFn(product);
            //! Find is a synchronous function, doesnt execute any async code.
            //! simple have 2 lines after each other will do the strick here.
        });
    }
}
exports.default = Product;
//# sourceMappingURL=product.js.map