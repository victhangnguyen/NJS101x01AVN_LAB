"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//! import Routes
const admin_1 = __importDefault(require("./routes/admin"));
const shop_1 = __importDefault(require("./routes/shop"));
//! an instance of the app object
const app = (0, express_1.default)();
//! Register Middlewares
app.use(express_1.default.urlencoded({ extended: false }));
//! implementing Routes
app.use(shop_1.default);
app.use(admin_1.default);
app.listen(3000);
//# sourceMappingURL=app.js.map