//! database
import db from '../utils/database';

//! __imp Models
import Cart from './cart';

export default class Product {
  // public id: string | undefined;
  constructor(public id: string | null, public title: string, public price: number, public imageUrl: string, public description: string) {
    // this.title = title;
    // this.imageUrl = imageUrl;
    // this.description = description;
    // this.price = price;
  }

  public save() {
    return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)', [this.title, this.price, this.imageUrl, this.description]);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products'); //! Table name: products
  }

  static findById(id: string) {}

  static deleteById(id: string) {}
}
