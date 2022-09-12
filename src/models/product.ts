import { Sequelize, DataTypes } from 'sequelize';

import sequelize from '../utils/database'; //! imp Database Connection Pool sequelize

//! We can defined a Model with be managed by sequelize
//   modelName: string,
//   attributes: ModelAttributes<M, TAttributes>, (Structure of the model, the automatically created database table)
//   options?: ModelOptions<M>
const Product = sequelize.define('Product', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  price: {
    type: DataTypes.NUMBER,
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
});
