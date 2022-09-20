//! imp library
import Logging from '../library/Logging';

//! imp models
import CartItem from './cart-item';
import User from './user';
import OrderItem from './order-item';
import Order from './order';

//! imp ultils - database
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
    public imageUrl: string
  ) {}
  async save() {
    //! We execute the callback and return connection Client, so that we can interact with it.
    //! However, if we would do this, we would have to connect to mongoDB for every Operation.
    //! We would not event disconnect. This is not really a good way of Connecting to MongoDB.
    const db = getDB(); //! get Database Connection
    //! call collection method to tell MongoDB into which Collection that you wanna insert
    return db
      .collection('products')
      .insertOne(this) //! add one Document, insertMany([]) : multiple Documents pass Array of JavaScript
      .then((result) => {
        console.log('result: ', result);
        // return result;
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  }
}

// the defined model is the class itself
Logging.info('models.product: '); // true : (Product === sequelize.models.product)

export default Product;
