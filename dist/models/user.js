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
//! imp library
const Logging_1 = __importDefault(require("../library/Logging"));
//! imp ultils - database
const mongoDB = __importStar(require("mongodb"));
const database_1 = require("../utils/database");
class User {
    constructor(name, email, cart, id) {
        this.name = name;
        this.email = email;
        this.cart = cart;
        this._id = id ? new mongoDB.ObjectId(id) : undefined;
    }
    save() {
        const db = (0, database_1.getDB)();
        let dbOperation;
        if (this._id) {
            //! update User
            const query = { _id: this._id };
            dbOperation = db.collection('users').updateOne(query, { $set: this });
        }
        else {
            //! create new User
            dbOperation = db.collection('users').insertOne(this);
        }
        return dbOperation
            .then((result) => {
            return result;
        })
            .catch((err) => {
            console.log(err);
        });
    }
    addToCart(productDoc) {
        const db = (0, database_1.getDB)();
        //! We expect get a product in here.
        //! Dont forget that addToCart will be called on a User Object with data we fetched from the Database with the help findById(userId) that return a User
        //! SQL: req.user -> getCart() -> getProducts() return Products (where: {id: productId}) => product (check exist)
        // const productCart = this.cart.items.findIndex((item) => {
        //   return item._id === product._id;
        // });
        const updatedCart = { items: [{ productId: productDoc._id, quantity: 1 }] };
        // console.log('__Debugger__updatedCart: ', updatedCart);
        return db
            .collection('users')
            .updateOne({ _id: this._id }, { $set: { cart: updatedCart } })
            .then((updateResult) => {
            // console.log('__Debugger__updateResult: ', updateResult)
        })
            .catch((err) => {
            console.log(err);
        });
        // if (productCart > 0) {
        //   //! existing product => increase Quantity
        // } else {
        //   //! set new Item, with quantity = 1
        // }
    }
    static findById(userId) {
        const db = (0, database_1.getDB)();
        const query = { _id: new mongoDB.ObjectId(userId) };
        return db
            .collection('users')
            .findOne(query)
            .then((userDoc) => {
            return userDoc;
        })
            .catch((err) => {
            console.log(err);
        });
    }
}
// the defined model is the class itself
Logging_1.default.info('models.user'); // true
exports.default = User;
//# sourceMappingURL=user.js.map