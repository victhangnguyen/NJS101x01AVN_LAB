"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    products: (Array),
    user: {
        name: { type: String, required: true },
        userId: {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
});
const Order = mongoose_1.default.model('Order', orderSchema);
exports.default = Order;
// import {
//   Model,
//   DataTypes,
//   CreationOptional,
//   InferAttributes,
//   InferCreationAttributes,
//   BelongsToManyAddAssociationsMixin,
// } from 'sequelize';
// import Product from './product';
// export type OrderAttributes = {
//   id: number;
// };
// class Order extends Model<
//   InferAttributes<Order>,
//   InferCreationAttributes<Order>
// > {
//   declare id: CreationOptional<number>;
//   declare addProducts: BelongsToManyAddAssociationsMixin<Product, number>;
// }
// Order.init(
//   {
//     // Model attributes are defined here
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true,
//     },
//   },
//   {
//     // Other model options go here
//     sequelize: sequelize, // We need to pass the connection instance
//     modelName: 'order', // We need to choose the model name
//   }
// );
// // the defined model is the class itself
// Logging.info('sequelize.models.order: ' + (Order === sequelize.models.order)); // true
// export default Order;
//# sourceMappingURL=order.js.map