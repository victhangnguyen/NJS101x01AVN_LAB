"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
//! import Routes
const admin_1 = __importDefault(require("./routes/admin"));
const shop_1 = __importDefault(require("./routes/shop"));
//! an instance of the app object
const app = (0, express_1.default)();
//! Register Middlewares
app.use(express_1.default.urlencoded({ extended: false }));
//! app.ts => root Directory : src
const publicDir = path_1.default.join(__dirname, '..', 'public');
app.use(express_1.default.static(publicDir));
//! implementing Routes
app.use('/admin', admin_1.default);
app.use(shop_1.default);
//! default '/', this will also handle all http methods, GET, POST, DELTE, PATCH, PUT...
app.use((req, res, next) => {
    const pathFile = path_1.default.join(__dirname, 'views/', '404.html');
    res.status(404).sendFile(pathFile);
});
//! 404 Error
//! We simply have to add a Catch all Middleware at the Bottom
app.listen(3000);
//# sourceMappingURL=app.js.map