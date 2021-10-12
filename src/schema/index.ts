import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import {
  addProduct,
  deleteProduct,
  updateProduct,
} from '../mutations/productMutations';
import {
  getPrivateData,
  getProduct,
  getProducts,
} from '../queries/productQueries';
import { createUser, loginUser } from '../mutations/userMutations';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    product: getProduct(),
    products: getProducts(),
    privateData: getPrivateData(),
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProduct: addProduct(),
    updateProduct: updateProduct(),
    deleteProduct: deleteProduct(),
    createUser: createUser(),
    loginUser: loginUser(),
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
