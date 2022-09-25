"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//! Product Schema
const productSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        require
    },
});
//! Product Model
const Product = mongoose_1.default.model('Product', productSchema); //! name: string, schema?: Schema<T, any, any> | Schema<T & Document, any, any>
exports.default = Product;
// declare id: number;
// declare title: string;
// declare price: number;
// declare imageUrl: string;
// declare description: string;
// declare cartItem: CartItem;
// declare orderItem: { quantity: number };
// class Product {
//   _id: mongoDB.ObjectId | undefined;
//   constructor(
//     public title: string,
//     public price: number,
//     public description: string,
//     public imageUrl: string,
//     id: string | null | undefined = undefined,
//     public userId: mongoDB.ObjectId //!  userId that is Id of user create new product
//   ) {
//     //! guard clause
//     //! __DEBUG ObjectID(undefined) => generate ID
//     this._id = id ? new mongoDB.ObjectId(id) : undefined;
//   }
//   async save() {
//     const db = getDB(); //! point to Database Connection
//     let dbOp; //! Db Operation
//     if (this._id) {
//       //! update the product
//       const query = { _id: this._id };
//       dbOp = db.collection('products').updateOne(query, { $set: this });
//     } else {
//       //! create new Product
//       dbOp = db.collection('products').insertOne(this);
//     }
//     return dbOp
//       .then((result) => {
//         // console.log('result: ', result);
//         return result;
//       })
//       .catch((err) => {
//         console.log('Error: ', err);
//       });
//   }
//   static fetchAll() {
//     const db = getDB(); //! point to DB Connection
//     return db
//       .collection('products')
//       .find({})
//       .toArray()
//       .then((productDocs) => {
//         return productDocs;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//   static findById(productId: string) {
//     const db = getDB(); //! point to DB Connection
//     const query = { _id: new mongoDB.ObjectId(productId) };
//     //! ID in mongodb is actually stored a different type.
//     return (
//       db
//         .collection('products')
//         .find(query)
//         //! Get the next available document from the cursor, returns null if no more documents are available.
//         .next()
//         .then((productDoc) => {
//           return productDoc;
//         })
//         .catch((err) => {
//           console.log(err);
//         })
//     );
//   }
//   static deleteById(productId: string) {
//     const db = getDB(); //! poin to DB Connection
//     const query = { _id: new mongoDB.ObjectId(productId) };
//     return db
//       .collection('products')
//       .deleteOne(query)
//       .then((deleteResult) => {
//         return deleteResult;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }
// // the defined model is the class itself
// Logging.info('models.product'); // true : (Product === sequelize.models.product)
// export default Product;
//# sourceMappingURL=product.js.map