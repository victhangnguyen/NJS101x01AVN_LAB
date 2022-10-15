"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    products: (Array),
    user: {
        email: { type: String, required: true },
        userId: {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
});
const Order = mongoose_1.default.model('Order', orderSchema);
exports.default = Order;
//# sourceMappingURL=order.js.map