import fs from 'fs';
import path from 'path';

//! get src directory
const p = path.join(
  path.dirname(require.main?.filename as string),
  'data',
  'cart.json'
);

interface IProductCart {
  id: string;
  qty: number;
}

class Cart {
  public products!: Array<IProductCart>;
  public totalPrice!: number;

  static addProduct(id: IProductCart['id'], productPrice: number) {
    //!_1. Fetch the previousCart
    fs.readFile(p, (err, fileContent) => {
      let cart: Cart = { products: [], totalPrice: 0 };

      if (!err) {
        cart = JSON.parse(fileContent.toString());
      }

      //!_2. Analyze the Cart => Find the existing product
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );

      const existingProduct = cart.products[existingProductIndex];

      //! if exist product =>> update product, else add new productCart
      let updatedProduct: IProductCart;

      //!_3. Add new product / increase the Quantity into Cart
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        //! cart.products = [...cart.products]; __???
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;

      //! storing cart to cart.json file
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
}

export default Cart;
