import UserType from '../schema/UserType';
import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from 'graphql';
import bcrypt from 'bcrypt';
import { IUser, User } from '../models/User';

export const createUser = (): any => {
  return {
    type: UserType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
      userType: { type: new GraphQLNonNull(GraphQLString) },
      active: { type: GraphQLBoolean, defaultValue: true },
    },
    async resolve(parent: any, args: IUser) {
      const { name, email, password, userType, active } = args;
      const user = User.build({
        name,
        email,
        password,
        userType,
        active,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      return user.save();
    },
  };
};

export const loginUser = (): any => {
  return {
    type: UserType,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      // password: {type: new GraphQLNonNull(GraphQLString)},
      success: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent: any, args: any) {
      // send error
      throw new Error('Name for character with ID 1002 could not be fetched.');
    },
  };
};
