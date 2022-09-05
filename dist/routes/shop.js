"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
//! imp Controllers
var products_1 = __importDefault(require("../controllers/products"));
var router = express_1.default.Router();
router.get('/', products_1.default.getProducts);
exports.default = router;
//# sourceMappingURL=shop.js.map