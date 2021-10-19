import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLUnionType,
  GraphQLNonNull,
  GraphQLEnumType,
} from 'graphql';
import GraphQLDateTime from './customScalars/GraphQLDateTime';

const UserRoleEnumType = new GraphQLEnumType({
  name: 'userRoleEnum',
  values: {
    ADMIN: {
      value: 0,
    },
    USER: {
      value: 1,
    },
  },
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    userType: { type: new GraphQLNonNull(UserRoleEnumType) },
    createdDate: { type: GraphQLDateTime },
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
