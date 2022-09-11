"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//! database
const database_1 = __importDefault(require("../utils/database"));
class Product {
    // public id: string | undefined;
    constructor(id, title, price, imageUrl, description) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        // this.title = title;
        // this.imageUrl = imageUrl;
        // this.description = description;
        // this.price = price;
    }
    save() {
        // create new
        return database_1.default.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)', [this.title, this.price, this.imageUrl, this.description]);
    }
    static fetchAll() {
        return database_1.default.execute('SELECT * FROM products'); //! Table name: products
    }
    static findById(id) {
        //! __generic RowDataPacket
        return database_1.default.execute('SELECT * FROM products WHERE products.id = ?', [id]);
    }
    static deleteById(id) { }
}
exports.default = Product;
//# sourceMappingURL=product.js.map