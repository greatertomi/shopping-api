import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    userType: { type: GraphQLString },
    createdDate: { type: GraphQLString },
    active: { type: GraphQLBoolean },
  }),
});

export default UserType;
