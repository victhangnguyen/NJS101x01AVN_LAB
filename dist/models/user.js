"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//! User Schema
const userSchema = new mongoose_1.default.Schema({
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
                    type: mongoose_1.default.Schema.Types.ObjectId,
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
userSchema.methods.addToCart = function (productDoc) {
    //! duplicate or not
    const cartProductIndex = this.cart.items.findIndex((item) => {
        return item.productId.toString() === productDoc._id.toString();
    });
    let newQuantity = 1;
    //! Therefor JavaScript Object works with Referenece, we should use Shallow Array
    const updatedCartItems = [...this.cart.items];
    if (cartProductIndex >= 0) {
        //! increase
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    }
    else {
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
userSchema.methods.removeFromCart = function (productId) {
    // console.log('__Debugger__productId: ', productId);
    const updatedCartItems = this.cart.items.filter(
    //! filter is not async
    (i) => {
        return i.productId.toString() !== productId.toString();
    });
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
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=user.js.map