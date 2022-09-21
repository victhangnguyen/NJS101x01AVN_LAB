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
const express_1 = __importDefault(require("express"));
//! imp Controllers
const adminController = __importStar(require("../controllers/admin"));
const router = express_1.default.Router();
//@ /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);
//@ /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);
//@ /admin/products => GET
router.get('/products', adminController.getProducts);
//@ /admin/edit-product/:productId => GET
router.get('/edit-product/:productId', adminController.getEditProduct);
//@ /admin/edit-product/:productId => POST
router.post('/edit-product', adminController.postEditProduct);
//@ /admin/delete-product => POST
router.post('/delete-product', adminController.postDeleteProduct);
exports.default = router;
//# sourceMappingURL=admin.js.map