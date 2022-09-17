"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { Model, DataTypes, Optional, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, BelongsToManyOptions, ThroughOptions, HasManyAddAssociationsMixin, BelongsToManyAddAssociationMixin, HasManyAddAssociationMixinOptions, AssociationOptions, CreationOptional } from 'sequelize';
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../utils/database")); //! imp Database Connection Pool sequelize
// export type CartAttributes = {
//   id: number;
// };
class Cart extends sequelize_1.Model {
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
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
}, {
    // Other model options go here
    tableName: 'cart',
    sequelize: // We need to choose the model name
    database_1.default, // We need to pass the connection instance
});
// the defined model is the class itself
console.log(Cart === database_1.default.models.cart); // true
exports.default = Cart;
//# sourceMappingURL=cart.js.map