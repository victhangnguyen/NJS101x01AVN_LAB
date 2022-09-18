//! imp library
import Logging from '../library/Logging';

// import { Model, DataTypes, Optional, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, BelongsToManyOptions, ThroughOptions, HasManyAddAssociationsMixin, BelongsToManyAddAssociationMixin, HasManyAddAssociationMixinOptions, AssociationOptions, CreationOptional } from 'sequelize';
import { Model, DataTypes, Optional, HasManyGetAssociationsMixin, BelongsToManyAddAssociationMixin } from 'sequelize';

import sequelize from '../utils/database'; //! imp Database Connection Pool sequelize
import Product from './product';
import User from './user';

export type CartAttributes = {
  id: number;
};

type ProductCreationAttributes = Optional<CartAttributes, 'id'>;

class Cart extends Model<CartAttributes, ProductCreationAttributes> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare id: number;
  declare getProducts: HasManyGetAssociationsMixin<Product>;
  declare addProduct: BelongsToManyAddAssociationMixin<Product, number>;
  // other attributes...
}

// type CartCreationAttributes = Optional<CartAttributes>;

// class Cart extends Model<CartAttributes, CartCreationAttributes> {
//   declare id: number;
//   declare getProducts: HasManyGetAssociationsMixin<Product>;
//   declare addProduct: HasManyAddAssociationMixin<Product, number>;
// }

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
    modelName: 'cart', // We need to choose the model name
    sequelize, // We need to pass the connection instance
  }
);

// the defined model is the class itself
Logging.info('sequelize.models.cart: ' + (Cart === sequelize.models.cart)); // true

export default Cart;
