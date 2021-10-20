import mongoose, { Schema } from 'mongoose';

export interface IProductPurchase {
  product: string;
  purchasedBy: string;
  quantity: number;
  unitCost: number;
  purchaseDate?: string;
}

interface ProductPurchaseModelInterface extends mongoose.Model<any> {
  build(attr: IProductPurchase): any;
}

const productPurchaseSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'product',
  },
  purchasedBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  quantity: {
    type: Number,
    required: true,
  },
  unitCost: {
    type: Number,
    required: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
});

productPurchaseSchema.statics.build = (attr: IProductPurchase) => {
  return new ProductPurchase(attr);
};

const ProductPurchase = mongoose.model<any, ProductPurchaseModelInterface>(
  'productPurchase',
  productPurchaseSchema
);

export { ProductPurchase };
