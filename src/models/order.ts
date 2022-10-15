import mongoose from 'mongoose';

//! imp library
import Logging from '../library/Logging';

export interface IOrder {
  products: [{ product: object; quantity: number }];
  user: {
    email: string;
    userId: mongoose.Types.ObjectId;
  };
}

export interface IOrderDocument extends IOrder, mongoose.Document {}

export interface IOrderModel extends mongoose.Model<IOrderDocument> {}

export interface IOrderProduct {
  product: { type: Object; required: true };
  quantity: { type: Number; required: true };
}

const orderSchema = new mongoose.Schema<IOrderDocument>({
  products: Array<IOrderProduct>,
  user: {
    email: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
});

const Order = mongoose.model<IOrderDocument, IOrderModel>('Order', orderSchema);

export default Order;