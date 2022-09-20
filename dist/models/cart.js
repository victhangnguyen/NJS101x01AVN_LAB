"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//! imp library
const Logging_1 = __importDefault(require("../library/Logging"));
class Cart extends Model {
}
// type CartCreationAttributes = Optional<CartAttributes>;
// class Cart extends Model<CartAttributes, CartCreationAttributes> {
//   declare id: number;
//   declare getProducts: HasManyGetAssociationsMixin<Product>;
//   declare addProduct: HasManyAddAssociationMixin<Product, number>;
// }
Cart.init({
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
}, {
    // Other model options go here
    modelName: 'cart',
    sequelize, // We need to pass the connection instance
});
// the defined model is the class itself
Logging_1.default.info('sequelize.models.cart: ' + (Cart === sequelize.models.cart)); // true
exports.default = Cart;
//# sourceMappingURL=cart.js.map