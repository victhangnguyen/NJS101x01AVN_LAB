import Logging from './library/Logging';
import path from 'path';
import express from 'express';

//! imp Routes
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';

//! imp Controllers
import * as errorController from './controllers/error';

//! imp Database
import db from './utils/database';

db.execute('SELECT * FROM products').then().catch();

//! an instance of the app object
const app = express();

//! set Template Engine
app.set('view engine', 'ejs');
//! set View source
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

app.listen(3000);
