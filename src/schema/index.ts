import {
  GraphQLID,
  GraphQLInt,
  GraphQLList, GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql';
import { PRODUCTS } from '../mocks/products';

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: {type: GraphQLString},
    status: { type: GraphQLString },
    price: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return PRODUCTS;
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProduct: {
      type: ProductType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: {type: new GraphQLNonNull(GraphQLString)},
        status: {type: GraphQLString, defaultValue: 'DRAFT'},
        price: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parent, args) {
        console.log(parent, args)
      }
    }
  }
})

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
