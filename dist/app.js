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
//! imp routes
// import adminRoutes from './routes/admin';
// import shopRoutes from './routes/shop';
//! imp controllers
const errorController = __importStar(require("./controllers/error"));
//! imp database
const database_1 = __importDefault(require("./utils/database"));
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
    //! Register user id 1
    // User.findByPk(1)
    //   .then((user) => {
    //     //! Store it in a Request, we will set request.user
    //     req.user = user!;
    //     next();
    //   })
    //   .catch((err) => err);
});
//! implementing Routes
// app.use('/admin', adminRoutes);
// app.use(shopRoutes); //! default: '/'
//! default '/', this will also handle all http methods, GET, POST, DELTE, PATCH, PUT...
app.use(errorController.get404);
(0, database_1.default)(client => {
    console.log(client);
    app.listen(3000);
});
//! then<void, never>(onfulfilled?: ((value: Sequelize) => void | PromiseLike<void>) | null | undefined, onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<...>
//! catch(onrejected?: ((reason: any) => PromiseLike<never>) | null | undefined): Promise<void>
//# sourceMappingURL=app.js.map