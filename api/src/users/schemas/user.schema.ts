import * as mongoose from 'mongoose';
import * as validator from 'validator';
import { User } from '../interfaces/user.interface';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      unique: true,
      required: [true, 'First name is required!'],
      trim: true,
      index: true,
    },
    lastName: {
      type: String,
      unique: true,
      required: [true, 'Last name is required!'],
      trim: true,
      index: true,
    },
    email: {
      type: String,
      unique: true,
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
      required: [true, 'Password is required!'],
      trim: true,
      minlength: [8, 'Password need to be at least 8 characters long.'],
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
