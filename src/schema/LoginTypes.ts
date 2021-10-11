import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

const LoginPassed = new GraphQLObjectType({
  name: 'LoginPassed',
  fields: () => ({
    message: { type: GraphQLString },
    token: { type: GraphQLString },
  }),
});

const LoginFailed = new GraphQLObjectType({
  name: 'LoginFailed',
  fields: () => ({
    code: { type: GraphQLInt },
    message: { type: GraphQLString },
  }),
});

// union LoginResult = LoginPassed | LoginFailed
