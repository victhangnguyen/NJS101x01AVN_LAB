//! npm i --save mysql2
import mysql from 'mysql2';

import { Sequelize } from 'sequelize'; //! Sequelize class

// constructor(database: string, username: string, password?: string, options?: Options);
const sequelize = new Sequelize('node-complete', 'root', 'js123456', { //! servername: node-complete
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

export default sequelize;
