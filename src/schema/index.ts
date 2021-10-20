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
import { getUser, getUsers } from '../queries/userQueries';
import { buyProduct } from '../mutations/purchaseMutations';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    product: getProduct(),
    products: getProducts(),
    privateData: getPrivateData(),
    users: getUsers(),
    user: getUser(),
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
    buyProduct: buyProduct(),
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
