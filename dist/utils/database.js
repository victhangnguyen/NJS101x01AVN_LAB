"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize"); //! Sequelize class
// constructor(database: string, username: string, password?: string, options?: Options);
const sequelize = new sequelize_1.Sequelize('node-complete', 'root', 'js123456', {
    // The dialect of the database you are connecting to. One of mysql, postgres, sqlite, mariadb and mssql.
    //! to make clear that we connect to a MySQL database because different SQL engines or databases use slightly different SQL syntax
    dialect: 'mysql',
    //! The host of the relational database.
    //! by default, it would use localhost, so we don't need to set it, but i will explicit set this to 'localhost'.
    host: 'localhost',
});
exports.default = sequelize;
//! We export sequelize object here which is essentially that database connection pool.
//! However this is managed by sequelize giving us a lot of useful features.
//# sourceMappingURL=database.js.map