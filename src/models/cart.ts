// import { Model, DataTypes, Optional, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, BelongsToManyOptions, ThroughOptions, HasManyAddAssociationsMixin, BelongsToManyAddAssociationMixin, HasManyAddAssociationMixinOptions, AssociationOptions, CreationOptional } from 'sequelize';
import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixin, BelongsToMany, BelongsToCreateAssociationMixin } from 'sequelize';

import sequelize from '../utils/database'; //! imp Database Connection Pool sequelize
import Product from './product';
import User from './user';

// export type CartAttributes = {
//   id: number;
// };

class Cart extends Model<InferAttributes<Cart>, InferCreationAttributes<Cart>> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare id: CreationOptional<number>;
  declare getProducts: HasManyGetAssociationsMixin<Product>;
  declare addProduct: BelongsToManyAddAssociationMixin <Product, number>;
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
    tableName: 'cart', // We need to choose the model name
    sequelize, // We need to pass the connection instance
  }
);

// the defined model is the class itself
console.log(Cart === sequelize.models.cart); // true

export default Cart;
