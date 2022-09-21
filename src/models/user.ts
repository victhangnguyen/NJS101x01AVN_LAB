//! imp library
import Logging from '../library/Logging';

//! imp models
import Cart from './cart';
import Product from './product';
import Order from './order';

//! imp ultils - database
import * as mongoDB from 'mongodb';
import { getDB } from '../utils/database';

class User {
  _id: mongoDB.ObjectId | undefined;
  constructor(
    public name: string,
    public email: string,
    id: string | undefined,
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
