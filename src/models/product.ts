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
  // public id: string | undefined;
  public id?: string;

  constructor(
    public title: string,
    public imageUrl: string,
    public description: string,
    public price: string
  ) {
    // this.title = title;
    // this.imageUrl = imageUrl;
    // this.description = description;
    // this.price = price;
  }

  public save() {
    //! init productId
    this.id = Math.random().toString();

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
