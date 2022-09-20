//! imp library
import Logging from '../library/Logging';

//! imp models
import CartItem from './cart-item';
import User from './user';
import OrderItem from './order-item';
import Order from './order';

//! imp ultils - database
import mongoConnect from '../utils/database';

class Product {
  constructor(
    public title: string,
    public price: number,
    public description: string,
    public imageUrl: string
  ) {}
  save(): Product {
    
  }
}

//! We execute the callback and return connection Client, so that we can interact with it.
//! However, if we would do this, we would have to connect to mongoDB for every Operation.
//! We would not event disconnect. This is not really a good way of Connecting to MongoDB.


// declare id: number;
// declare title: string;
// declare price: number;
// declare imageUrl: string;
// declare description: string;
// declare cartItem: CartItem;
// declare orderItem: { quantity: number };

// the defined model is the class itself
Logging.info('models.product: '); // true : (Product === sequelize.models.product)

export default Product;
