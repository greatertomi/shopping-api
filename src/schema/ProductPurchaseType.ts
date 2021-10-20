import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import ProductType from './ProductType';
import { Product } from '../models/Product';
import UserType from './UserType';
import { User } from '../models/User';
import GraphQLDateTime from './customScalars/GraphQLDateTime';

const ProductPurchaseType = new GraphQLObjectType({
  name: 'ProductPurchase',
  fields: () => ({
    id: { type: GraphQLID },
    quantity: { type: new GraphQLNonNull(GraphQLInt) },
    unitCost: { type: new GraphQLNonNull(GraphQLInt) },
    product: {
      type: ProductType,
      resolve(parent, args) {
        return Product.findById(parent.product);
      },
    },
    purchasedBy: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.purchasedBy);
      },
    },
    purchasedDate: { type: GraphQLDateTime },
  }),
});

export default ProductPurchaseType;
