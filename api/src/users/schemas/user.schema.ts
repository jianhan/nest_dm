import * as mongoose from 'mongoose';
import * as validator from 'validator';
import { User } from '../interfaces/user.interface';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required!'],
      trim: true,
      index: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required!'],
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required!'],
      trim: true,
      index: true,
      validate: {
        validator(email: string) {
          return validator.isEmail(email);
        },
      },
    },
    password: {
      type: String,
      trim: true,
      minlength: [8, 'Password need to be at least 8 characters long.'],
    },
    github: {
      provider: String,
      profileId: Number,
      avatarUrl: String,
      url: String,
      username: String,
      displayName: String,
    },
  },
  { timestamps: true },
);

UserSchema.pre('save', function save(next: any) {
  const user = this as User;
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (er: Error, hash: string) => {
      if (er) {
        return next(er);
      }
      user.password = hash;
      next();
    });
  });
});
