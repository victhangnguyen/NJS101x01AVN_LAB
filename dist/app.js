"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
//! import Routes
var admin_1 = __importDefault(require("./routes/admin"));
var shop_1 = __importDefault(require("./routes/shop"));
//! an instance of the app object
var app = (0, express_1.default)();
//! set Template Engine
app.set('view engine', 'ejs');
//! set View source
app.set('views', 'src/views');
//! Register Middlewares
app.use(express_1.default.urlencoded({ extended: false }));
//! app.ts => root Directory : src
var publicDir = path_1.default.join(__dirname, '..', 'public');
app.use(express_1.default.static(publicDir));
//! implementing Routes
app.use('/admin', admin_1.default.routes);
app.use(shop_1.default);
//! default '/', this will also handle all http methods, GET, POST, DELTE, PATCH, PUT...
app.use(function (req, res, next) {
    //! default Handlebars have layout: main, set props with layout is false to ignore the layout
    res.render('404', { pageTitle: 'Page Not Found', path: '' }); //! pass props {}
});
//! 404 Error
//! We simply have to add a Catch all Middleware at the Bottom
app.listen(3000);
//# sourceMappingURL=app.js.map