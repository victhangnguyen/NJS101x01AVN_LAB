"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Logging_1 = __importDefault(require("../library/Logging"));
//! imp HTML
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
router.get('/', (req, res, next) => {
    //! using Slash for the rootPath, an absolute path seen from the Root Folder
    //! __dirname this is Global Variable that holds the Absolute Path on Operating System to this Project Folder.
    const pathFile = path_1.default.join(__dirname, '../', 'views', 'shop.html');
    Logging_1.default.info(pathFile);
    res.sendFile(pathFile);
});
exports.default = router;
//# sourceMappingURL=shop.js.map