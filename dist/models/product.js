"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//! In the real-world, the Models has relationship with the Database.
var products = [];
// module.exports = class Product ... => export default
var Product = /** @class */ (function () {
    //! implicitly initialize Public Fields
    // constructor(t) {
    //   this.title = t;
    // }
    function Product(title) {
        this.title = title;
    }
    Product.prototype.save = function () {
        //! JS | Product.prototype.save = function () {...}
        //! This method to store product in this product Array
        products.push(this);
        //! this keyword will refer to the Object created based on Product Class
    };
    Product.fetchAll = function () {
        //! JS | Product.prototype.fetchAll = function () {...}
        //! This is not called on a Single Instance of the Product because it should fetch All Products
        //! Therefore We will add static-keyword which make sure that We only can call this method  directly on the Class itself and not on Instantiated object.
        return products;
    };
    return Product;
}());
exports.default = Product;
//# sourceMappingURL=product.js.map