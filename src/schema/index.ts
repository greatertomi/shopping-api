import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import { PRODUCTS } from '../mocks/products';
import ProductType from './ProductType';

import { Product } from '../models/Product';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return PRODUCTS;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProduct: {
      type: ProductType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        status: { type: GraphQLString, defaultValue: 'DRAFT' },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        currentQuantity: { type: GraphQLInt, defaultValue: 1 },
      },
      resolve(parent, args) {
        console.log(parent, args);
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
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
