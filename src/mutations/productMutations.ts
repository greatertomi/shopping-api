import ProductType from '../schema/ProductType';
import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql';
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
      createdBy: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parent: any, args: IProduct) {
      const { name, description, status, price, currentQuantity, createdBy } =
        args;
      const product = Product.build({
        name,
        description,
        status,
        price,
        currentQuantity,
        createdBy,
      });
      return product.save();
    },
  };
};

export const updateProduct = (): any => {
  return {
    type: ProductType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLString },
      description: { type: GraphQLString },
      status: { type: GraphQLString },
      price: { type: GraphQLInt },
      currentQuantity: { type: GraphQLInt },
      createdBy: { type: GraphQLID },
    },
    resolve(parent: any, args: IProduct) {
      const {
        id,
        name,
        description,
        status,
        price,
        currentQuantity,
        createdBy,
      } = args;
      return Product.findByIdAndUpdate(id, {
        name,
        description,
        status,
        price,
        currentQuantity,
        createdBy,
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
