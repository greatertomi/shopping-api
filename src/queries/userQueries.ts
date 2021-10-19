import UserType from '../schema/UserType';
import { GraphQLID, GraphQLInt, GraphQLList } from 'graphql';
import { IUser, User } from '../models/User';

export const getUsers = (): any => {
  return {
    type: new GraphQLList(UserType),
    args: {
      limit: { type: GraphQLInt },
    },
    resolve(parent: any, args: any) {
      const { limit } = args;
      return User.find().limit(limit);
    },
  };
};

export const getUser = (): any => {
  return {
    type: UserType,
    args: { id: { type: GraphQLID } },
    resolve(parent: any, args: IUser) {
      return User.findById(args.id);
    },
  };
};
