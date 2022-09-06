import fs from 'fs';
import path from 'path';

export default class Product {
  constructor(public title: string) {}

  public save() {
    // require.main?.filename as string | This point to the src folder
    const p: string = path.join(
      path.dirname(require.main?.filename as string), //! main src
      'data',
      'products.json'
    );
    console.log('p: ', p);
    //! You also create a readStream
    //! We need to get the Existing Array Product (but with Read File, we can read the entire file here)
    fs.readFile(p, (err, fileContent) => {
      //! There will be a Buffer
      //! if file no existing, we simply create a new empty Array Product
      let products: Array<Product> = [];

      //! guard clause
      if (!err) {
        //! err => no exist, !err (null) => exist

        // products = JSON.parse(fileContent);
        products = JSON.parse(fileContent.toString()); //! parse have text: string
      }

      products.push(this);
      //! save
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log('Models -> write File: ', err);
      });
    });
  }

  static fetchAll(cb: any) {
    const p: string = path.join(
      path.dirname(require.main?.filename as string), //! main src
      'data',
      'products.json'
    );
    
    fs.readFile(p, (err, dataBuffer) => {
      if (err) {
        // return [];
        cb([]);
        //! instead of returning Array [], we have a callback with Array Empty
      }
      console.log('Models -> fetchAll: ', JSON.parse(dataBuffer.toString()));
      // return JSON.parse(dataBuffer.toString());
      cb(JSON.parse(dataBuffer.toString()));
    });
  }
}


