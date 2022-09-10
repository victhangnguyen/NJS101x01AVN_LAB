"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//! database
const database_1 = __importDefault(require("../utils/database"));
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
    save() { }
    static fetchAll() {
        return database_1.default.execute('SELECT * FROM products'); //! Table name: products
    }
    static findById(id) { }
    static deleteById(id) { }
}
exports.default = Product;
//# sourceMappingURL=product.js.map