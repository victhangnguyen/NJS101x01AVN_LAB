//! imp library
import Logging from '../library/Logging';

import { Model, DataTypes, Optional } from 'sequelize';


import CartItem from './cart-item';

import User from './user';
import OrderItem from './order-item';
import Order from './order';

export type ProductAttributes = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
};

type ProductCreationAttributes = Optional<ProductAttributes, 'id'>;

class Product extends Model<ProductAttributes, ProductCreationAttributes> {
  declare id: number;
  declare title: string;
  declare price: number;
  declare imageUrl: string;
  declare description: string;
  declare cartItem: CartItem;
  declare orderItem: { quantity: number };
  // declare orderItem: Order;
}

Product.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize: sequelize, // We need to pass the connection instance
    modelName: 'product', // We need to choose the model name
  }
);

// the defined model is the class itself
Logging.info(
  'sequelize.models.product: ' + (Product === sequelize.models.product)
); // true

export default Product;
