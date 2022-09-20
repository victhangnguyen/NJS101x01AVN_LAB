//! imp library
import Logging from '../library/Logging';

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  BelongsToManyAddAssociationsMixin,
} from 'sequelize';

import sequelize from '../utils/database'; //! imp Database Connection Pool sequelize
import Product from './product';

export type OrderAttributes = {
  id: number;
};

class Order extends Model<
  InferAttributes<Order>,
  InferCreationAttributes<Order>
> {
  declare id: CreationOptional<number>;
  declare addProducts: BelongsToManyAddAssociationsMixin<Product, number>;
}

Order.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    // Other model options go here
    sequelize: sequelize, // We need to pass the connection instance
    modelName: 'order', // We need to choose the model name
  }
);

// the defined model is the class itself
Logging.info('sequelize.models.order: ' + (Order === sequelize.models.order)); // true

export default Order;
