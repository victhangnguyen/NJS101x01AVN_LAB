"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var p = path_1.default.join(path_1.default.dirname((_a = require.main) === null || _a === void 0 ? void 0 : _a.filename), //! main src
'data', 'products.json');
//! Helper Funcction
var getProductsFromFile = function (callbackFn) {
    fs_1.default.readFile(p, function (err, dataBuffer) {
        //! fulfilled
        if (err) {
            callbackFn([]);
        }
        else {
            callbackFn(JSON.parse(dataBuffer.toString()));
        }
    });
};
var Product = /** @class */ (function () {
    function Product(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        // this.title = title;
        // this.imageUrl = imageUrl;
        // this.description = description;
        // this.price = price;
    }
    Product.prototype.save = function () {
        var _this = this;
        //! init productId
        this.id = Math.random().toString();
        getProductsFromFile(function (products) {
            //! callbackFn return Array<Product>
            products.push(_this);
            fs_1.default.writeFile(p, JSON.stringify(products), function (err) {
                console.log(err);
            });
        });
    };
    Product.fetchAll = function (callbackFn) {
        getProductsFromFile(callbackFn);
    };
    Product.findById = function (id, callbackFn) {
        getProductsFromFile(function (products) {
            var product = products.find(function (prod) { return prod.id === id; }); //! just find first element
            callbackFn(product);
            //! Find is a synchronous function, doesnt execute any async code.
            //! simple have 2 lines after each other will do the strick here.
        });
    };
    return Product;
}());
exports.default = Product;
//# sourceMappingURL=product.js.map