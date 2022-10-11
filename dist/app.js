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
const Logging_1 = __importDefault(require("./library/Logging"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
// import session from 'express-session';
const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const MongoDBStore = (0, connect_mongodb_session_1.default)(session);
//! imp database
const mongoose_1 = __importDefault(require("mongoose"));
//! imp routes
const admin_1 = __importDefault(require("./routes/admin"));
const shop_1 = __importDefault(require("./routes/shop"));
const auth_1 = __importDefault(require("./routes/auth"));
//! imp models
const user_1 = __importDefault(require("./models//user"));
//! imp controllers
const errorController = __importStar(require("./controllers/error"));
const MONGODB_USERNAME = 'njs101x';
const MONGODB_PASSWORD = 'njs101x';
const DATABASE = 'shop';
const MONGODB_URI = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.nbojriq.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;
//! createExpress -> instance Express()
const app = (0, express_1.default)();
const store = new MongoDBStore({ uri: MONGODB_URI, collection: 'sessions' });
app.set('view engine', 'ejs');
app.set('views', 'src/views');
//! Register __middlewares
app.use(express_1.default.urlencoded({ extended: false }));
const publicDir = path_1.default.join(__dirname, '..', 'public');
app.use(express_1.default.static(publicDir));
app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: false,
    store: store,
}));
//! Authentication
app.use((req, res, next) => {
    Logging_1.default.infoAsync('Authentication', () => {
        const currentUserId = '632fe0941cb168613f986706';
        user_1.default.findById(currentUserId)
            .then((userDoc) => {
            req.user = userDoc; //! Mongoose Model Object
            next();
        })
            .catch((err) => err);
    });
});
//! implementing Routes
app.use('/admin', admin_1.default);
app.use(shop_1.default); //! default: '/'
app.use(auth_1.default);
//! default '/', this will also handle all http methods, GET, POST, DELTE, PATCH, PUT...
app.use(errorController.get404);
//! connect method that takes the URL we used for connecting before
mongoose_1.default
    .connect(MONGODB_URI)
    .then((mongooseConnection) => {
    // console.log('__Debugger__mongooseConnection: ', mongooseConnection);
    const initialCart = {
        items: [],
        total: 0,
    };
    user_1.default.findOne({})
        .then((userDoc) => {
        if (!userDoc) {
            const user = new user_1.default({
                name: 'thangncfx16840',
                email: 'thangncfx16840@funix.edu.vn',
                cart: initialCart,
            });
            user.save();
        }
    })
        .catch((err) => {
        console.log(err);
    });
    const PORT = 3000;
    app.listen(PORT, () => {
        Logging_1.default.info('Server is running in port ' + PORT);
    });
})
    .catch((err) => {
    console.log(err);
});
//# sourceMappingURL=app.js.map