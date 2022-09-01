"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get('/', function (req, res, next) {
    //! using Slash for the rootPath, an absolute path seen from the Root Folder
    //! __dirname this is Global Variable that holds the Absolute Path on Operating System to this Project Folder.
    // console.log('shop.ts: ', adminData.products)
    // const pathFile = path.join(rootDir, 'views', 'shop.html');
    // res.sendFile(pathFile);
    //! This will use the Default Tempalting Engine
    res.render('shop'); //! shop.pug
});
exports.default = router;
//# sourceMappingURL=shop.js.map