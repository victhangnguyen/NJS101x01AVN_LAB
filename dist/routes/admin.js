"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
//! imp Controllers
var products_1 = __importDefault(require("../controllers/products"));
var router = express_1.default.Router();
//! /admin/add-product/ => GET
router.get('/add-product', products_1.default.getAddProduct);
//! /admin/add-product/ => POST
router.post('/add-product', products_1.default.postAddProduct);
exports.default = router;
//# sourceMappingURL=admin.js.map