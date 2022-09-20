"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//! imp library
const Logging_1 = __importDefault(require("../library/Logging"));
const sequelize_1 = require("sequelize");
class OrderItem extends sequelize_1.Model {
}
OrderItem.init({
    // Model attributes are defined here
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    // Other model options go here
    sequelize: sequelize,
    modelName: 'orderItem', // We need to choose the model name
});
// the defined model is the class itself
Logging_1.default.info('sequelize.models.orderItem: ' + (OrderItem === sequelize.models.orderItem)); // true
exports.default = OrderItem;
//# sourceMappingURL=order-item.js.map