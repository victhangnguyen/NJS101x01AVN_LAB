import mongoose from 'mongoose';
import { IProduct, IProductDocument } from './product';

//! User Interface
export interface IUser {
  email: string;
  password: string;
  cart: Array<ICartProduct>;
}

export interface ICartProduct {
  items: Array<ICartItem>;
  quantity: number;
}

export interface IUserDocument extends IUser, mongoose.Document {
  addToCart: (product: IProductDocument) => IProductDocument;
  removeFromCart: (productId: string) => Promise<IUserDocument>;
}
interface IUserModel extends mongoose.Model<IUserDocument> {}
//! Put all of instance methods in this interface

export interface ICartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface ICart {
  items: Array<ICartItem>;
}

//! User Schema
const userSchema = new mongoose.Schema<IUserDocument>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

//! Instance methods
//! assign a function to the "methods" object of our userSchema
userSchema.methods.addToCart = function (productDoc: IProductDocument) {
  //! duplicate or not
  const cartProductIndex = this.cart.items.findIndex((item: ICartItem) => {
    return item.productId.toString() === productDoc._id.toString();
  });

  let newQuantity = 1;
  //! Therefor JavaScript Object works with Referenece, we should use Shallow Array
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    //! increase
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    //! add new
    updatedCartItems.push({
      productId: productDoc._id,
      quantity: newQuantity,
    });
  }

  const updatedCart = { items: updatedCartItems };
  this.cart = updatedCart;
  // console.log('__Debugger__this.cart: ', this.cart);
  return this.save();
};

userSchema.methods.removeFromCart = function (productId: string) {
  // console.log('__Debugger__productId: ', productId);
  const updatedCartItems = this.cart.items.filter(
    //! filter is not async
    (i: ICartItem) => {
      return i.productId.toString() !== productId.toString();
    }
  );
  // console.log('__Debugger__updatedCartItems: ', updatedCartItems);
  //! update => save
  this.cart.items = updatedCartItems;
  return this.save(); //! return Promise UserDoc
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};
//! User Model
const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);
export default User;