import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import {
  addProduct,
  deleteProduct,
  updateProduct,
} from '../mutations/productMutations';
import { getProduct, getProducts } from '../queries/productQueries';
import { createUser } from '../mutations/userMutations';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    product: getProduct(),
    products: getProducts(),
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProduct: addProduct(),
    updateProduct: updateProduct(),
    deleteProduct: deleteProduct(),
    createUser: createUser(),
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
