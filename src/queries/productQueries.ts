import ProductType from '../schema/ProductType';
import { GraphQLID, GraphQLList } from 'graphql';
import { IProduct, Product } from '../models/Product';
import { LoginPassedType } from '../schema/UserType';

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

export const getPrivateData = (): any => {
  return {
    type: LoginPassedType,
    resolve(parent: any, args: any, context: any) {
      console.log('CONTEXT', context);
      return {
        message: 'private data acquired',
        token: '12758',
        user: {
          id: '1234',
          name: 'paulino',
        },
      };
    },
  };
};
