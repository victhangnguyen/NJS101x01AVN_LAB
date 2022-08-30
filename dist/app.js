"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logging_1 = __importDefault(require("./library/Logging"));
const express_1 = __importDefault(require("express"));
//! an instance of the app object
const app = (0, express_1.default)();
//! Register Middlewares
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/product', (req, res, next) => {
    Logging_1.default.info(req.body);
    //! Redirect
    res.redirect('/');
});
app.use('/add-product', (req, res, next) => {
    res.send(`
    <form action="/product" method="POST">
      <input type="text" name="title">
        <button type="submit">Add Product</button>
      </input>
    </form>
  `);
});
// next(); //! The Request goes through the File from TOP to BOTTOM,
//! if we dont call next(); it's not going to the next() middleware.
//! If middlewares 1 don't call next(), this middleware 2 will never get a chance of handling that Request.
//!
app.use('/', (req, res, next) => {
    //! (property) Response<any, Record<string, any>, number>.send: (body?: any) => express.Response<any, Record<string, any>>
    res.send(`<h1>Hello from Express</h1>`);
});
app.listen(3000);
//# sourceMappingURL=app.js.map