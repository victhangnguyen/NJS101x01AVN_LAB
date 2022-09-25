import mongoose from 'mongoose';

//! imp library
import Logging from '../library/Logging';

export interface IOrder {
  products: [{ product: object; quantity: number }];
  user: {
    name: string;
    userId: mongoose.Types.ObjectId;
  };
}

export interface IOrderDocument extends IOrder, mongoose.Document {}

export interface IOrderModel extends mongoose.Model<IOrderDocument> {}

export interface IOrderProduct {
  product: { type: Object; required: true };
  quantity: { type: Number; required: true };
}

const orderSchema = new mongoose.Schema<IOrderDocument>({
  products: Array<IOrderProduct>,
  user: {
    name: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
});

const Order = mongoose.model<IOrderDocument, IOrderModel>('Order', orderSchema);

export default Order;

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
