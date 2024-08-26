import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  googleId?: string;
  name: string;
  email: string;
  password?: string;
  age?: number;       // Added age
  location?: string;  // Added location
  faith?: string; // Added faith
  isAvailableForMeal: boolean;
}

const userSchema: Schema = new Schema(
  {
    googleId: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    age: {
      type: Number, 
    },
    location: {
      type: String, 
    },
    faith: {
      type: String,
      required: false,
  },
    isAvailableForMeal: {
      type: Boolean,
      default: false,
  },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
