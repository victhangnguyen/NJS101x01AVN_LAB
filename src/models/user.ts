//! imp library
import Logging from '../library/Logging';

//! imp models
import Product from './product';
import Order from './order';

//! imp ultils - database
import * as mongoDB from 'mongodb';
import { getDB } from '../utils/database';

// interface IProductCart extends Product {
//   quantity: number,
// }

export interface ICart {
  items: Array<{
    title: string;
    price: number;
    description: string;
    imageUrl: string;
    // _id: string | undefined;
    userId: mongoDB.ObjectId; //!  userId that is Id of user create new product
    quantity: number;
  }>;
}

class User {
  _id: mongoDB.ObjectId | undefined;
  constructor(
    public name: string,
    public email: string,
    public cart: ICart,
    id: mongoDB.ObjectId | string | undefined
  ) {
    this._id = id ? new mongoDB.ObjectId(id) : undefined;
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
