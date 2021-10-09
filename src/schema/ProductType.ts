import {GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString} from "graphql";

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: {type: GraphQLString},
    status: { type: GraphQLString },
    price: { type: GraphQLInt },
    currentQuantity: {type: GraphQLInt},
    createdDate: {type: GraphQLString}
  })
});

export default ProductType
