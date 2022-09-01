"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//! imp core modules
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
//! utils - libs
const path_2 = __importDefault(require("../utils/path"));
const router = express_1.default.Router();
router.get('/', (req, res, next) => {
    //! using Slash for the rootPath, an absolute path seen from the Root Folder
    //! __dirname this is Global Variable that holds the Absolute Path on Operating System to this Project Folder.
    const pathFile = path_1.default.join(path_2.default, 'views', 'shop.html');
    res.sendFile(pathFile);
});
exports.default = router;
//# sourceMappingURL=shop.js.map