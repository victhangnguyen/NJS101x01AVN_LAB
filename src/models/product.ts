//! In the real-world, the Models has relationship with the Database.
const products: Product[] = [];

// module.exports = class Product ... => export default
export default class Product {
  //! implicitly initialize Public Fields
  // constructor(t) {
  //   this.title = t;
  // }
  constructor(public title: string) {}

  public save() {
    //! JS | Product.prototype.save = function () {...}
    //! This method to store product in this product Array
    products.push(this);
    //! this keyword will refer to the Object created based on Product Class
  }

  static fetchAll() {
    //! JS | Product.prototype.fetchAll = function () {...}
    //! This is not called on a Single Instance of the Product because it should fetch All Products
    //! Therefore We will add static-keyword which make sure that We only can call this method  directly on the Class itself and not on Instantiated object.
    return products;
  }
}
