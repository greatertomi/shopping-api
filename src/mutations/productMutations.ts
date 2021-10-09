import ProductType from '../schema/ProductType';
import { GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql';
import { IProduct, Product } from '../models/Product';

export const addProduct = (): any => {
  return {
    type: ProductType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: new GraphQLNonNull(GraphQLString) },
      status: { type: GraphQLString, defaultValue: 'DRAFT' },
      price: { type: new GraphQLNonNull(GraphQLInt) },
      currentQuantity: { type: GraphQLInt, defaultValue: 1 },
    },
    resolve(parent: any, args: IProduct) {
      const { name, description, status, price, currentQuantity } = args;
      const product = Product.build({
        name,
        description,
        status,
        price,
        currentQuantity,
      });
      return product.save();
    },
  };
};
