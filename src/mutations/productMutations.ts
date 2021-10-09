import ProductType from '../schema/ProductType';
import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql';
import { IProduct, Product } from '../models/Product';

const productArguments = {
  name: { type: new GraphQLNonNull(GraphQLString) },
  description: { type: new GraphQLNonNull(GraphQLString) },
  status: { type: GraphQLString, defaultValue: 'DRAFT' },
  price: { type: new GraphQLNonNull(GraphQLInt) },
  currentQuantity: { type: GraphQLInt, defaultValue: 1 },
};

export const addProduct = (): any => {
  return {
    type: ProductType,
    args: productArguments,
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

export const updateProduct = (): any => {
  return {
    type: ProductType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) }, ...productArguments },
    resolve(parent: any, args: IProduct) {
      const { id, name, description, status, price, currentQuantity } = args;
      return Product.findByIdAndUpdate(id, {
        name,
        description,
        status,
        price,
        currentQuantity,
      });
    },
  };
};

export const deleteProduct = (): any => {
  return {
    type: ProductType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    resolve(parent: any, args: IProduct) {
      return Product.findByIdAndDelete(args.id);
    },
  };
};
