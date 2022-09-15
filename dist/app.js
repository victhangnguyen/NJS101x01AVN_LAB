"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
//! imp Routes
const admin_1 = __importDefault(require("./routes/admin"));
const shop_1 = __importDefault(require("./routes/shop"));
//! imp Controllers
const errorController = __importStar(require("./controllers/error"));
//! imp Sequelize - Database Connection Pool
const database_1 = __importDefault(require("./utils/database"));
//! imp Models
const product_1 = __importDefault(require("./models/product"));
const user_1 = __importDefault(require("./models//user"));
//! createExpress -> instance Express()
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.set('views', 'src/views');
//! Register Middlewares
app.use(express_1.default.urlencoded({ extended: false }));
//! app.ts => root Directory : src
const publicDir = path_1.default.join(__dirname, '..', 'public');
app.use(express_1.default.static(publicDir));
app.use((req, res, next) => {
    user_1.default.findByPk(1)
        .then((user) => {
        //! Store it in a Request, we will set request.user
        req.user = user;
        next();
    })
        .catch((err) => err);
});
//! implementing Routes
app.use('/admin', admin_1.default);
app.use(shop_1.default); //! default: '/'
//! default '/', this will also handle all http methods, GET, POST, DELTE, PATCH, PUT...
app.use(errorController.get404);
//! Association
product_1.default.belongsTo(user_1.default, { constraints: true, onDelete: 'CASCADE' }); //! Talk about: User created this Product
user_1.default.hasMany(product_1.default);
//! Sync all defined models to the DB.
database_1.default
    // .sync({ force: true })
    .sync()
    .then((result) => {
    //! the Relations are set-up
    return user_1.default.findByPk(1);
})
    .then((user) => {
    if (!user) {
        //! If user is null, means: we dont have a User, we need to create a new One
        return user_1.default.create({ name: 'Max', email: 'test@test.com' });
        //! Builds a new model instance and calls save on it.
    }
    return user;
})
    .then((user) => {
    app.listen(3000);
})
    .catch((err) => console.log(err));
//! then<void, never>(onfulfilled?: ((value: Sequelize) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<...>
//! catch(onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>
//# sourceMappingURL=app.js.map