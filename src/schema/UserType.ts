import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLUnionType,
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

export const LoginPassedType = new GraphQLObjectType({
  name: 'LoginPassed',
  fields: () => ({
    message: { type: GraphQLString },
    token: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return parent.user;
      },
    },
  }),
});

export const LoginFailedType = new GraphQLObjectType({
  name: 'LoginFailed',
  fields: () => ({
    message: { type: GraphQLString },
    code: { type: GraphQLInt },
  }),
});

export const LoginType = new GraphQLUnionType({
  name: 'Login',
  types: [LoginPassedType, LoginFailedType],
  resolveType(value: any) {
    return value.success ? LoginPassedType : LoginFailedType;
  },
});

export default UserType;
