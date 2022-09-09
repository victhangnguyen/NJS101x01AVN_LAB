import fs from 'fs';
import path from 'path';
import Product from './product';

//! get src directory
const p = path.join(path.dirname(require.main?.filename as string), 'data', 'cart.json');

interface IProductCart {
  id: string;
  qty: number;
}

class Cart {
  public products!: Array<IProductCart>;
  public totalPrice!: number;

  //! GET Products
  static getCart(callbackFn: (cart: Cart | null) => void): void {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent.toString());
      if (err) {
        callbackFn(null);
      } else {
        callbackFn(cart);
      }
    }); //! async
  }

  static addProduct(id: Product['id'], productPrice: Product['price']) {
    //!_1. Fetch the previousCart
    fs.readFile(p, (err, fileContent) => {
      let cart: Cart = { products: [], totalPrice: 0 };

      if (!err) {
        cart = JSON.parse(fileContent.toString());
      }

      //!_2. Analyze the Cart => Find the existing product
      const existingProductIndex: number = cart.products.findIndex((prod) => prod.id === id);

      const existingProduct = cart.products[existingProductIndex];

      //! if exist product =>> update product, else add new productCart
      let updatedProduct: IProductCart;

      //!_3. Add new product / increase the Quantity into Cart
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products]; //!__???
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id!, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;

      //! storing cart to cart.json file
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  //! delete Product into Cart
  static deleteProduct(id: Product['id'], productPrice: Product['price']) {
    //! we need [param] productPrice, because We'll need update the total cart price.
    fs.readFile(p, (err, fileContent) => {
      //! guard clause
      if (err) {
        return;
      }
      const cart = JSON.parse(fileContent.toString());

      const updatedCart = { ...cart };
      //! This wil be fixed later - "cart" don't exist here. We will need to parse that from fileContent.
      const product: IProductCart = updatedCart.products.find((prod: IProductCart) => prod.id === id);

      //! guard clause
      if (!product) return;

      const productQty: IProductCart['qty'] = product.qty;
      //! and now, I can update my cart products here.

      updatedCart.products = updatedCart.products.filter((prod: IProductCart) => prod.id !== id);
      updatedCart.totalPrice = cart.totalPrice - productPrice * productQty; //! qty: 3, it should be reduced by the product price times three

      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }
}

export default Cart;
