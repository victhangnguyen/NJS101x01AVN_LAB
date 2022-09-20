//! imp library
import Logging from '../library/Logging';

import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';


import User from './user';

export type CartItemAttributes = {
  id: number;
  quantity: number;
};

// type CartItemCreationAttributes = Optional<CartItemAttributes, 'id'>;

class CartItem {
  declare id: CreationOptional<number>;
  declare quantity: number;
}

// CartItem.init(
//   {
//     // Model attributes are defined here
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true,
//     },
//     quantity: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//   },
//   {
//     // Other model options go here
//     sequelize: sequelize, // We need to pass the connection instance
//     modelName: 'cartItem', // We need to choose the model name
//   }
// );

// // the defined model is the class itself
// Logging.info('sequelize.models.cartItem: ' + (CartItem === sequelize.models.cartItem)); // true

export default CartItem;
