import mongoose from 'mongoose';

export interface IProduct {
  id?: string;
  name: string;
  description: string;
  status: string;
  price: string;
  currentQuantity?: string;
  createdDate?: string;
}

interface ProductModelInterface extends mongoose.Model<any> {
  build(attr: IProduct): any;
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currentQuantity: {
    type: Number,
    required: true,
    default: 1,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

productSchema.statics.build = (attr: IProduct) => {
  return new Product(attr);
};

const Product = mongoose.model<any, ProductModelInterface>(
  'product',
  productSchema
);

export { Product };
