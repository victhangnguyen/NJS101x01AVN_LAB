"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDB = exports.mongoConnect = void 0;
//! imp library
const Logging_1 = __importDefault(require("../library/Logging"));
const mongoDB = __importStar(require("mongodb"));
const usernameMongoDB = 'njs101x';
const passwordMongoDB = 'njs101x';
let _db;
const MongoClient = new mongoDB.MongoClient(`mongodb+srv://${usernameMongoDB}:${passwordMongoDB}@cluster0.nbojriq.mongodb.net/?retryWrites=true&w=majority`);
const mongoConnect = (callbackFn) => {
    MongoClient.connect()
        .then((client) => {
        Logging_1.default.info('Connected!');
        //! storing a Connection database in _db
        _db = client.db(); //! Database Instance (client.db)
        callbackFn();
    })
        .catch((err) => {
        throw err;
    });
};
exports.mongoConnect = mongoConnect;
//! This method will return access to that Connected-Database if _db exist.
const getDB = () => {
    if (_db) {
        //! if _db is set
        return _db; //! return Database Instance (client.db)
    }
    //! else, throw error
    throw 'No database found';
};
exports.getDB = getDB;
//# sourceMappingURL=database.js.map