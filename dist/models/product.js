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
// declare id: number;
// declare title: string;
// declare price: number;
// declare imageUrl: string;
// declare description: string;
// declare cartItem: CartItem;
// declare orderItem: { quantity: number };
class Product {
    constructor(title, price, description, imageUrl, id = undefined, userId //!  userId that is Id of user create new product
    ) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.userId = userId;
        //! guard clause
        //! __DEBUG ObjectID(undefined) => generate ID
        this._id = id ? new mongoDB.ObjectId(id) : undefined;
    }
    async save() {
        const db = (0, database_1.getDB)(); //! point to Database Connection
        let dbOp; //! Db Operation
        if (this._id) {
            //! update the product
            const query = { _id: this._id };
            dbOp = db.collection('products').updateOne(query, { $set: this });
        }
        else {
            //! create new Product
            dbOp = db.collection('products').insertOne(this);
        }
        return dbOp
            .then((result) => {
            // console.log('result: ', result);
            return result;
        })
            .catch((err) => {
            console.log('Error: ', err);
        });
    }
    static fetchAll() {
        const db = (0, database_1.getDB)(); //! point to DB Connection
        return db
            .collection('products')
            .find({})
            .toArray()
            .then((productDocs) => {
            return productDocs;
        })
            .catch((err) => {
            console.log(err);
        });
    }
    static findById(productId) {
        const db = (0, database_1.getDB)(); //! point to DB Connection
        const query = { _id: new mongoDB.ObjectId(productId) };
        //! ID in mongodb is actually stored a different type.
        return (db
            .collection('products')
            .find(query)
            //! Get the next available document from the cursor, returns null if no more documents are available.
            .next()
            .then((productDoc) => {
            return productDoc;
        })
            .catch((err) => {
            console.log(err);
        }));
    }
    static deleteById(productId) {
        const db = (0, database_1.getDB)(); //! poin to DB Connection
        const query = { _id: new mongoDB.ObjectId(productId) };
        return db
            .collection('products')
            .deleteOne(query)
            .then((deleteResult) => {
            return deleteResult;
        })
            .catch((err) => {
            console.log(err);
        });
    }
}
// the defined model is the class itself
Logging_1.default.info('models.product'); // true : (Product === sequelize.models.product)
exports.default = Product;
//# sourceMappingURL=product.js.map