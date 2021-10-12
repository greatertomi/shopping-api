import UserType, {
  LoginFailedType,
  LoginPassedType,
  LoginType,
} from '../schema/UserType';
import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from 'graphql';
import bcrypt from 'bcrypt';
import { IUser, User } from '../models/User';
import jwt from 'jsonwebtoken';

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
    type: LoginType,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent: any, args: any) {
      const { email, password } = args;

      const user = await User.findOne({ email });
      if (!user) {
        return { success: false, message: 'User does not exist', code: 404 };
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return { success: false, message: 'Wrong Password', code: 401 };
      }
      const payload = { id: user.id, userType: user.userType };
      // @ts-ignore
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '10h',
      });
      return { success: true, message: 'Login successful', token, user };
    },
  };
};
