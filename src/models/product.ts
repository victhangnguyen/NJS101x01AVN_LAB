import { Model, DataTypes } from 'sequelize';

import sequelize from '../utils/database'; //! imp Database Connection Pool sequelize

class Product extends Model {}

Product.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      // allowNull defaults to true
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
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
    modelName: 'Product', // We need to choose the model name
  }
);

// the defined model is the class itself
console.log(Product === sequelize.models.Product); // true

export default Product;
