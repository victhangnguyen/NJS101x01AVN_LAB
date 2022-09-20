//! imp library
import Logging from '../library/Logging';

import {
  Model,
  DataTypes,
  Optional,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasOneGetAssociationMixin,
  HasOneCreateAssociationMixin,
} from 'sequelize';
import sequelize from '../utils/database'; //! imp Database Connection Pool sequelize

//! imp models
import Cart from './cart';
import Product from './product';
import Order from './order';

export type UserAttributes = {
  id: number;
  name: string;
  email: string;
};

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number;
  declare name: string;
  declare email: string;
  declare getProducts: HasManyGetAssociationsMixin<Product>; // Note the null assertions!
  declare createProduct: HasManyCreateAssociationMixin<Product, 'id'>;
  declare getCart: HasOneGetAssociationMixin<Cart>;
  declare createCart: HasOneCreateAssociationMixin<Cart>;
  declare createOrder: HasManyCreateAssociationMixin<Order, 'id'>;
}

User.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize: sequelize, // We need to pass the connection instance
    modelName: 'user', // We need to choose the model name
  }
);

// the defined model is the class itself
Logging.info('sequelize.models.user: ' + (User === sequelize.models.user)); // true

export default User;
