"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../utils/database")); //! imp Database Connection Pool sequelize
class Product extends sequelize_1.Model {
}
Product.init({
    // Model attributes are defined here
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
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
    // userId: {
    //   type: DataTypes.INTEGER,
    //   // references: {
    //   //   model: User,
    //   //   key: 'id',
    //   // },
    // },
}, {
    // Other model options go here
    sequelize: database_1.default,
    modelName: 'product', // We need to choose the model name
});
// the defined model is the class itself
console.log(Product === database_1.default.models.product); // true
exports.default = Product;
//# sourceMappingURL=product.js.map