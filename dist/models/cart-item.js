"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../utils/database")); //! imp Database Connection Pool sequelize
class CartItem extends sequelize_1.Model {
}
CartItem.init({
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
    sequelize: database_1.default,
    modelName: 'cartItem', // We need to choose the model name
});
// the defined model is the class itself
console.log(CartItem === database_1.default.models.cartItem); // true
exports.default = CartItem;
//# sourceMappingURL=cart-item.js.map