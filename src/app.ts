import Logging from './library/Logging';
import path from 'path';
import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import expressHbs from 'express-handlebars';

//! import Routes
import adminData from './routes/admin';
import shopRoutes from './routes/shop';

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
app.use('/admin', adminData.routes);
app.use(shopRoutes);

//! default '/', this will also handle all http methods, GET, POST, DELTE, PATCH, PUT...
app.use((req: Request, res: Response, next: NextFunction) => {
  //! default Handlebars have layout: main, set props with layout is false to ignore the layout
  res.render('404', { pageTitle: 'Page Not Found', path: '' }); //! pass props {}
});

//! 404 Error
//! We simply have to add a Catch all Middleware at the Bottom

app.listen(3000);
