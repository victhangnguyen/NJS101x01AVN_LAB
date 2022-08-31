"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Logging_1 = __importDefault(require("../library/Logging"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const pathFile = path_1.default.join(__dirname, '../', 'views', 'add-product.html');
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