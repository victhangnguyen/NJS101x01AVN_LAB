"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../utils/database")); //! imp Database Connection Pool sequelize
//! We can defined a Model with be managed by sequelize
//   modelName: string,
//   attributes: ModelAttributes<M, TAttributes>, (Structure of the model, the automatically created database table)
//   options?: ModelOptions<M>
const Product = database_1.default.define('Product', {
    // Model attributes are defined here
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: sequelize_1.DataTypes.STRING,
    price: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
//# sourceMappingURL=product.js.map