import { Model, DataTypes, Optional } from 'sequelize';

import sequelize from '../utils/database'; //! imp Database Connection Pool sequelize

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
    modelName: 'User', // We need to choose the model name
  }
);

// the defined model is the class itself
console.log(User === sequelize.models.User); // true

export default User;
