"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//! npm i --save mysql2
const mysql2_1 = __importDefault(require("mysql2"));
//! configuration
const connectionOption = {
    //! Database Engine (Host)
    //! [prop: host : ConnectionOptions]
    host: 'localhost',
    //! [prop: user : ConnectionOption]
    user: 'root',
    //! [prop: database: ConnectionOption]
    password: 'js123456',
    //! [prop: database: ConnectionOption]
    database: 'node-complete', //! name of the Schema
};
const pool = mysql2_1.default.createPool(connectionOption); //! ConnectionOption
exports.default = pool.promise(); //! because this allow us to use Promises when working with these Connections which of course handle Asynchronous.
//! Asynchronous data instead of Callback Function because Promise allow us to write Code that dont have many Nested Callback
//# sourceMappingURL=database.js.map