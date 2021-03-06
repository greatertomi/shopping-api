import mongoose from 'mongoose';

enum userTypes {
  ADMIN,
  USER,
}

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  userType: userTypes;
  createdDate?: string;
  active?: boolean;
}

interface UserModelInterface extends mongoose.Model<any> {
  build(attr: IUser): any;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ['ADMIN', 'USER'],
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

userSchema.statics.build = (attr: IUser) => {
  return new User(attr);
};

const User = mongoose.model<any, UserModelInterface>('user', userSchema);

export { User };
