import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  googleId?: string;
  name: string;
  email: string;
  password?: string;
  age?: number;       // Added age
  location?: string;  // Added location
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
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
