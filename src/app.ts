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

//! createExpress -> instance Express()
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');

//! Register Middlewares
app.use(express.urlencoded({ extended: false }));

//! app.ts => root Directory : src
const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));

//! implementing Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes); //! default: '/'

//! default '/', this will also handle all http methods, GET, POST, DELTE, PATCH, PUT...
app.use(errorController.get404);

//! Sync all defined models to the DB.
sequelize
  .sync({ force: true }) //! If force is true, each DAO will do DROP TABLE IF EXISTS ..., before it tries to create its own table
  .then((result: Sequelize) => {
    console.log('Result: ', result);
    //! Sync with Express Application
    app.listen(3000);
  })
  .catch((err) => console.log(err));

//! then<void, never>(onfulfilled?: ((value: Sequelize) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<...>
//! catch(onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>
