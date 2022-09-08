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
    // public id: string | undefined;
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
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
        getProductsFromFile((products) => {
            if (this.id) {
                const existingProductIndex = products.findIndex((product) => {
                    return product.id === this.id; //! __DEBUG existing = -1 => callbackFn do not return
                });
                const updatedProducts = [...products]; //! handling shallow copy array (create a nextUpdatedProducts)
                updatedProducts[existingProductIndex] = this;
                //! store updatedProducts to products.json
                fs_1.default.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                });
            }
            else {
                //! create a New Product
                this.id = Math.random().toString();
                products.push(this);
                fs_1.default.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
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
    static deleteById(id, callbackFn) {
        getProductsFromFile((products) => {
            const updatedProducts = products.filter((product) => product.id !== id);
            fs_1.default.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                //! if not error => it log to null
                if (!err) {
                    //! Work on the Cart and make sure we can delete items from there.
                }
            });
        });
    }
}
exports.default = Product;
//# sourceMappingURL=product.js.map