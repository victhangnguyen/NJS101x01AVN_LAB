"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//! imp library
const Logging_1 = __importDefault(require("../library/Logging"));
class Product {
    constructor(title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }
    save() {
    }
}
//! We execute the callback and return connection Client, so that we can interact with it.
//! However, if we would do this, we would have to connect to mongoDB for every Operation.
//! We would not event disconnect. This is not really a good way of Connecting to MongoDB.
// declare id: number;
// declare title: string;
// declare price: number;
// declare imageUrl: string;
// declare description: string;
// declare cartItem: CartItem;
// declare orderItem: { quantity: number };
// the defined model is the class itself
Logging_1.default.info('models.product: '); // true : (Product === sequelize.models.product)
exports.default = Product;
//# sourceMappingURL=product.js.map