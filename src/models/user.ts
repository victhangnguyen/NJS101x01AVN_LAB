//! imp library
import Logging from '../library/Logging';

//! imp models
import Product from './product';
// import Order from './order';

//! imp ultils - database
import * as mongoDB from 'mongodb';
import { getDB } from '../utils/database';
import { json } from 'sequelize';

// interface ICartProduct extends Product {
//   quantity: number,
// }

interface ICartProduct {
  productId: mongoDB.ObjectId;
  quantity: number;
}
export interface ICart {
  items: Array<ICartProduct>;
  total: number;
}

// const initialCart: ICart = {
//   items: [],
//   total: 0,
// };

class User {
  _id: mongoDB.ObjectId | undefined;
  // cart: ICart;

  constructor(
    public name: string,
    public email: string,
    public cart: ICart = { items: [], total: 0 }, //! initialCart
    // cart: ICart,
    id: mongoDB.ObjectId | string | undefined
  ) {
    this._id = id ? new mongoDB.ObjectId(id) : undefined;
    // this.cart = cart ? cart : initialCart;
  }

  save() {
    const db = getDB();
    let dbOperation;
    if (this._id) {
      //! update User
      const query = { _id: this._id };

      dbOperation = db.collection('users').updateOne(query, { $set: this });
    } else {
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

  addToCart(productDoc: mongoDB.Document) {
    const db = getDB();

    const cartProductIndex = this.cart.items.findIndex((item: ICartProduct) => {
      return item.productId.toString() === productDoc._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items]; //! JavaScript Object works with Referenece

    if (cartProductIndex >= 0) {
      //! increase
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
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
        console.log('__Debugger__updateResult: ', updateResult);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(userId: string) {
    const db = getDB();
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
Logging.info('models.user'); // true

export default User;
