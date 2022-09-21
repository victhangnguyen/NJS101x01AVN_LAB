//! imp library
import Logging from '../library/Logging';

//! imp models
import CartItem from './cart-item';
import User from './user';
import OrderItem from './order-item';
import Order from './order';

//! imp ultils - database
import * as mongoDB from 'mongodb';
import { getDB } from '../utils/database';

// declare id: number;
// declare title: string;
// declare price: number;
// declare imageUrl: string;
// declare description: string;
// declare cartItem: CartItem;
// declare orderItem: { quantity: number };

class Product {
  constructor(
    public title: string,
    public price: number,
    public description: string,
    public imageUrl: string,
    public _id: string | null = null
  ) {}
  async save() {
    const db = getDB(); //! point to Database Connection
    let dbOp; //! Db Operation

    if (this._id) {
      //! update the product
      const query = {};
      // const updatedProduct = localVariable;

      dbOp = db
        .collection('products')
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      //! create new Product
      const newProduct = {
        // _id //! MongoDB is automatically generate ObjectId
        title: this.title,
        price: this.price,
        description: this.description,
        imageUrl: this.imageUrl,
      };

      dbOp = db.collection('products').insertOne(newProduct);
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

  static async fetchAll() {
    const db = getDB(); //! point to DB Connection
    return db
      .collection('products')
      .find({})
      .toArray()
      .then((products) => {
        console.log(products);

        return products;
      })
      .catch((err) => {
        console.log(err);
      });
    //! find is asynchronous, find is find does not immediately return a Promise though, instead it return a Cursor (FindCursor)
    //! toArray should only be used that if we know that on ten, hunred Documents... (return Promise)
  }

  static async findById(productId: string) {
    const db = getDB(); //! point to DB Connection
    const query = { _id: new mongoDB.ObjectId(productId) };
    //! ID in mongodb is actually stored a different type.

    return (
      db
        .collection('products')
        .find(query)
        //! Get the next available document from the cursor, returns null if no more documents are available.
        .next()
        .then((product) => {
          return product;
        })
        .catch((err) => {
          console.log(err);
        })
    );
  }
}

// the defined model is the class itself
Logging.info('models.product: '); // true : (Product === sequelize.models.product)

export default Product;
