import ProductPurchaseType from '../schema/ProductPurchaseType';
import { GraphQLID, GraphQLInt, GraphQLNonNull } from 'graphql';
import { IProductPurchase, ProductPurchase } from '../models/ProductPurchase';
import { Product } from '../models/Product';

export const buyProduct = (): any => {
  return {
    type: ProductPurchaseType,
    args: {
      product: { type: new GraphQLNonNull(GraphQLID) },
      purchasedBy: { type: new GraphQLNonNull(GraphQLID) },
      quantity: { type: new GraphQLNonNull(GraphQLInt) },
      unitCost: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve(parent: any, args: IProductPurchase) {
      const { product, unitCost, purchasedBy, quantity } = args;
      const productPurchase = ProductPurchase.build({
        product,
        unitCost,
        purchasedBy,
        quantity,
      });
      Product.findByIdAndUpdate(product, {
        $inc: { currentQuantity: quantity },
      });
      return productPurchase.save();
    },
  };
};
