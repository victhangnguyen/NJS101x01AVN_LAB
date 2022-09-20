"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//! imp library
const Logging_1 = __importDefault(require("../library/Logging"));
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
User.init({
    // Model attributes are defined here
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    // Other model options go here
    sequelize: sequelize,
    modelName: 'user', // We need to choose the model name
});
// the defined model is the class itself
Logging_1.default.info('sequelize.models.user: ' + (User === sequelize.models.user)); // true
exports.default = User;
//# sourceMappingURL=user.js.map