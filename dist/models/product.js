"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var Product = /** @class */ (function () {
    function Product(title) {
        this.title = title;
    }
    Product.prototype.save = function () {
        var _this = this;
        var _a;
        // require.main?.filename as string | This point to the src folder
        var p = path_1.default.join(path_1.default.dirname((_a = require.main) === null || _a === void 0 ? void 0 : _a.filename), //! main src
        'data', 'products.json');
        console.log('p: ', p);
        //! You also create a readStream
        //! We need to get the Existing Array Product (but with Read File, we can read the entire file here)
        fs_1.default.readFile(p, function (err, fileContent) {
            //! There will be a Buffer
            //! if file no existing, we simply create a new empty Array Product
            var products = [];
            //! guard clause
            if (!err) {
                //! err => no exist, !err (null) => exist
                // products = JSON.parse(fileContent);
                products = JSON.parse(fileContent.toString()); //! parse have text: string
            }
            products.push(_this);
            //! save
            fs_1.default.writeFile(p, JSON.stringify(products), function (err) {
                console.log('Models -> write File: ', err);
            });
        });
    };
    Product.fetchAll = function (cb) {
        var _a;
        var p = path_1.default.join(path_1.default.dirname((_a = require.main) === null || _a === void 0 ? void 0 : _a.filename), //! main src
        'data', 'products.json');
        fs_1.default.readFile(p, function (err, dataBuffer) {
            if (err) {
                // return [];
                cb([]);
                //! instead of returning Array [], we have a callback with Array Empty
            }
            console.log('Models -> fetchAll: ', JSON.parse(dataBuffer.toString()));
            // return JSON.parse(dataBuffer.toString());
            cb(JSON.parse(dataBuffer.toString()));
        });
    };
    return Product;
}());
exports.default = Product;
//# sourceMappingURL=product.js.map