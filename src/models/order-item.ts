//! imp library
import Logging from '../library/Logging';

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';



export type OrderItemItemAttributes = {
  id: number;
  quantity: number;
};

class OrderItem extends Model<
  InferAttributes<OrderItem>,
  InferCreationAttributes<OrderItem>
> {
  declare id: CreationOptional<number>;
  declare quantity: number;
}

OrderItem.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize: sequelize, // We need to pass the connection instance
    modelName: 'orderItem', // We need to choose the model name
  }
);

// the defined model is the class itself
Logging.info(
  'sequelize.models.orderItem: ' + (OrderItem === sequelize.models.orderItem)
); // true

export default OrderItem;
