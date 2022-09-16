import Logging from './library/Logging';
import path from 'path';
import express from 'express';

//! imp Routes
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';

//! imp Controllers
import * as errorController from './controllers/error';

//! imp Sequelize - Database Connection Pool
import sequelize from './utils/database';
import { Sequelize } from 'sequelize';

//! imp Models
import Product from './models/product';
import User from './models//user';
import Cart from './models/cart';
import CartItem from './models/cart-item';

// ! Extending the Request type
declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}

//! createExpress -> instance Express()
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');

//! Register Middlewares
app.use(express.urlencoded({ extended: false }));

//! app.ts => root Directory : src
const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      //! Store it in a Request, we will set request.user
      req.user = user!;
      next();
    })
    .catch((err) => err);
});

//! implementing Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes); //! default: '/'

//! default '/', this will also handle all http methods, GET, POST, DELTE, PATCH, PUT...
app.use(errorController.get404);

//! Association
//! User <=> Product
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' }); //! Talk about: User created this Product
User.hasMany(Product);

//! User <=> Cart
Cart.belongsTo(User); //!  Cart hold a foreign key (userId)
User.hasOne(Cart);

//! Cart <=> Product
//! a Cart contain multiple Product and a Product typpe that is contained in multiple Cart
Cart.belongsToMany(Product, { through: CartItem }); //! through tell Sequelize where these connection should be stored an that is cart-item model.
Product.belongsToMany(Cart, { through: CartItem });
//! Many-To-Many Relationship
//! This only works with an intermediate Table that connects them which basically stores a combination of product IDs and cart IDs.

//! Cart should belong to a User
//! Cart holds products
//! Many products with a Quantity associated to them.

//! Sync all defined models to the DB.
sequelize
  // .sync({ force: true })
  .sync()
  .then((result: Sequelize) => {
    //! the Relations are set-up
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      //! If user is null, means: we dont have a User, we need to create a new One
      return User.create({ name: 'Max', email: 'test@test.com' });
      //! Builds a new model instance and calls save on it.
    }
    return user;
  })
  .then((user) => {
    user.createCart(); //! create cart with user id = 1
  }).then(cart => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

//! then<void, never>(onfulfilled?: ((value: Sequelize) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<...>
//! catch(onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>
