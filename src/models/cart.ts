import { Model, DataTypes, Optional, HasManyGetAssociationsMixin } from 'sequelize';

import sequelize from '../utils/database'; //! imp Database Connection Pool sequelize
import Product from './product';
import User from './user';

export type CartAttributes = {
  id: number;
};

type CartCreationAttributes = Optional<CartAttributes, 'id'>;

class Cart extends Model<CartAttributes, CartCreationAttributes> {
  declare id: number;
  declare getProducts: HasManyGetAssociationsMixin<Product>;
}

Cart.init(
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
    modelName: 'cart', // We need to choose the model name
  }
);

// the defined model is the class itself
console.log(Cart === sequelize.models.cart); // true

export default Cart;
