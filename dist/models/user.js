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
// import Order from './order';
//! imp ultils - database
const mongoDB = __importStar(require("mongodb"));
const database_1 = require("../utils/database");
// const initialCart: ICart = {
//   items: [],
//   total: 0,
// };
class User {
    // cart: ICart;
    constructor(name, email, cart = { items: [], total: 0 }, //! initialCart
    // cart: ICart,
    id) {
        this.name = name;
        this.email = email;
        this.cart = cart;
        this._id = id ? new mongoDB.ObjectId(id) : undefined;
        // this.cart = cart ? cart : initialCart;
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
    getCart() {
        // return this.cart;
        const db = (0, database_1.getDB)();
        const productIds = this.cart.items.map((item) => item.productId);
        // console.log('__Debugger__productIds: ', productIds);
        return db
            .collection('products')
            .find({ _id: { $in: productIds } })
            .toArray()
            .then((productDocs) => {
            // console.log('__Debugger__productDocs: ', productDocs);
            //! map productIds with productDocs
            return productDocs.map((pDoc) => {
                var _a;
                return {
                    ...pDoc,
                    quantity: (_a = this.cart.items.find((i) => i.productId.toString() === pDoc._id.toString())) === null || _a === void 0 ? void 0 : _a.quantity,
                };
            });
        })
            .then((result) => {
            return result;
        })
            .catch((err) => {
            console.log(err);
        });
        //! pass an Object allow us to use some specail mongodb query operators.
        //! $in operator: in this operator takes an Array of IDs and therefore every ID into the Array will be accepted (duyệt)
        //! and will get back a Cursor which holds reference to all products with one of the IDs mentioned in this Array.
    }
    addToCart(productDoc) {
        const db = (0, database_1.getDB)();
        const cartProductIndex = this.cart.items.findIndex((item) => {
            return item.productId.toString() === productDoc._id.toString();
        });
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items]; //! JavaScript Object works with Referenece
        if (cartProductIndex >= 0) {
            //! increase
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        }
        else {
            updatedCartItems.push({
                productId: productDoc._id,
                quantity: newQuantity,
            });
        }
        const updatedCart = { items: updatedCartItems };
        return db
            .collection('users')
            .updateOne({ _id: this._id }, { $set: { cart: updatedCart } })
            .then((updateResult) => {
            // console.log('__Debugger__updateResult: ', updateResult);
            return updateResult;
        })
            .catch((err) => {
            console.log(err);
        });
    }
    resetCart() {
        const db = (0, database_1.getDB)();
        this.cart.items = [];
        return db
            .collection('users')
            .updateOne({ _id: new mongoDB.ObjectId(this._id) }, { $set: { cart: { items: [] } } });
    }
    deleteItemFromCart(productId) {
        const db = (0, database_1.getDB)();
        // console.log('__Debugger__productId: ', productId);
        const updatedCartItems = this.cart.items.filter(
        //! filter is not async
        (i) => i.productId.toString() !== productId);
        // console.log('__Debugger__updatedCartItems: ', updatedCartItems);
        const query = { _id: this._id }; //! filter userId
        return db
            .collection('users')
            .updateOne(query, { $set: { cart: { items: updatedCartItems } } })
            .then((updateResult) => {
            return updateResult;
        })
            .catch((err) => {
            console.log(err);
        });
    }
    getOrders() {
        const db = (0, database_1.getDB)();
        return db
            .collection('orders')
            .find({ 'user._id': new mongoDB.ObjectId(this._id) }) //! find all of orders base on userId
            .toArray()
            .then((orderDocs) => {
            return orderDocs;
        })
            .catch((err) => {
            console.log(err);
        });
    }
    addOrder() {
        const db = (0, database_1.getDB)();
        return this.getCart()
            .then((products) => {
            //! each product: productInfo + quantity
            const order = {
                //! implement products information
                items: products,
                //! add some information adbout the user
                user: {
                    //! user: this
                    _id: new mongoDB.ObjectId(this._id),
                    name: this.name,
                    // email: this.email, //! if email that we care that need update, we should not add.
                },
            };
            return db.collection('orders').insertOne(order);
        })
            .then((orderDoc) => {
            //! RESET CART
            this.resetCart()
                .then((result) => {
                Logging_1.default.info('addOrder successful! Reset cart');
            })
                .catch((err) => {
                console.log(err);
            });
            return orderDoc;
        })
            .catch((err) => {
            console.log(err);
        });
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