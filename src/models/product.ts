import { Model, DataTypes, Optional } from 'sequelize';

import sequelize from '../utils/database'; //! imp Database Connection Pool sequelize
import User from './user';

export type ProductAttributes = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  // userId: number;
};

type ProductCreationAttributes = Optional<ProductAttributes, 'id'>;

class Product extends Model<ProductAttributes, ProductCreationAttributes> {
  declare id: number;
  declare title: string;
  declare price: number;
  declare imageUrl: string;
  declare description: string;
  // declare userId: number;
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
    // userId: {
    //   type: DataTypes.INTEGER,
    //   // references: {
    //   //   model: User,
    //   //   key: 'id',
    //   // },
    // },
  },
  {
    // Other model options go here
    sequelize: sequelize, // We need to pass the connection instance
    modelName: 'product', // We need to choose the model name
  }
);

// the defined model is the class itself
console.log(Product === sequelize.models.product); // true

export default Product;
