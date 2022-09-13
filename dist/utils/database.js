"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize"); //! Sequelize class
// constructor(database: string, username: string, password?: string, options?: Options);
const sequelize = new sequelize_1.Sequelize('node-complete', 'root', 'js123456', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
});
exports.default = sequelize;
//# sourceMappingURL=database.js.map