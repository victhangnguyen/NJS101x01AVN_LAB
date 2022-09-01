"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//! core modules
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
//! utils - libs
const Logging_1 = __importDefault(require("../library/Logging"));
const path_2 = __importDefault(require("../utils/path"));
const router = express_1.default.Router();
const pathFile = path_1.default.join(path_2.default, 'views', 'add-product.html');
//! implicitly, this route is reached /admin/add-product/ => GET
router.get('/add-product', (req, res, next) => {
    res.sendFile(pathFile);
});
//! implicitly, this route is reached /admin/add-product/ => POST
router.post('/add-product', (req, res, next) => {
    Logging_1.default.info(req.body);
    //! Redirect
    res.redirect('/');
});
exports.default = router;
//# sourceMappingURL=admin.js.map