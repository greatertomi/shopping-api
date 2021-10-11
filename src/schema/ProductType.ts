import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import UserType from './UserType';
import { User } from '../models/User';

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    price: { type: GraphQLInt },
    currentQuantity: { type: GraphQLInt },
    createdBy: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.createdBy);
      },
    },
    createdDate: { type: GraphQLString },
  }),
});

export default ProductType;
