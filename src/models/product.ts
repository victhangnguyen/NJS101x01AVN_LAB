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
  constructor(public id: string | null, public title: string, public imageUrl: string, public description: string, public price: number) {
    // this.title = title;
    // this.imageUrl = imageUrl;
    // this.description = description;
    // this.price = price;
  }

  public save() {
    getProductsFromFile((products: Array<Product>) => {
      if (this.id) {
        const existingProductIndex = products.findIndex((product) => {
          return product.id === this.id; //! __DEBUG existing = -1 => callbackFn do not return
        });
        
        const updatedProducts = [...products]; //! handling shallow copy array (create a nextUpdatedProducts)
        updatedProducts[existingProductIndex] = this;

        //! store updatedProducts to products.json
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        //! create a New Product
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(callbackFn: any) {
    getProductsFromFile(callbackFn);
  }

  static findById(id: string, callbackFn: any) {
    getProductsFromFile((products: Array<Product>) => {
      const product = products.find((prod) => prod.id === id); //! just find first element
      callbackFn(product);
      //! Find is a synchronous function, doesnt execute any async code.
      //! simple have 2 lines after each other will do the strick here.
    });
  }
}
