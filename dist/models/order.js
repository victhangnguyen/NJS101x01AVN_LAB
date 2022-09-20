"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//! imp library
const Logging_1 = __importDefault(require("../library/Logging"));
const sequelize_1 = require("sequelize");
class Order extends sequelize_1.Model {
}
Order.init({
    // Model attributes are defined here
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
}, {
    // Other model options go here
    sequelize: sequelize,
    modelName: 'order', // We need to choose the model name
});
// the defined model is the class itself
Logging_1.default.info('sequelize.models.order: ' + (Order === sequelize.models.order)); // true
exports.default = Order;
//# sourceMappingURL=order.js.map