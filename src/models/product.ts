import fs from 'fs';
import path from 'path';

const p: string = path.join(
  path.dirname(require.main?.filename as string), //! main src
  'data',
  'products.json'
);

//! Helper Funcction
const getProductsFromFile = (callbackFn: any) => {
  fs.readFile(p, (err, dataBuffer) => {
    //! fulfilled
    if (err) {
      callbackFn([]);
    } else {
      callbackFn(JSON.parse(dataBuffer.toString()));
    }
  });
};

export default class Product {
  constructor(public title: string) {}

  public save() {
    getProductsFromFile((products: Array<Product>) => {
      //! callbackFn return Array<Product>
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb: any) {
    getProductsFromFile(cb);
  }
}
