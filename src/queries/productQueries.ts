import ProductType from '../schema/ProductType';
import { GraphQLID, GraphQLList } from 'graphql';
import { IProduct, Product } from '../models/Product';

export const getProduct = (): any => {
  return {
    type: ProductType,
    args: { id: { type: GraphQLID } },
    resolve(parent: any, args: IProduct) {
      return Product.findById(args.id);
    },
  };
};

export const getProducts = (): any => {
  return {
    type: new GraphQLList(ProductType),
    resolve(parent: any, args: IProduct) {
      return Product.find();
    },
  };
};
