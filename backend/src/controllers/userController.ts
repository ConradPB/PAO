import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User.js';
import { AuthenticatedRequest } from '../types/custom.js';


import dotenv from 'dotenv';
dotenv.config();

// Ensure JWT_SECRET is defined
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('JWT_SECRET is not defined');
}

// Function to generate JWT token
const generateToken = (id: string): string => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: '30d',
  });
};

// Register user
export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, age, location } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      age,
      location,
    });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
      location: user.location,
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Login user
export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get user profile
export const getUserProfile = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const user = req.user;

  if (user) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,          
      location: user.location,
    });
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
};

// Update user profile
export const updateUserProfile = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const user = req.user;

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.age = req.body.age || user.age;            
    user.location = req.body.location || user.location; 

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    try {
      const updatedUser = await user.save();

      return res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        age: updatedUser.age,
        location: updatedUser.location,
        token: generateToken(updatedUser._id.toString()),
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
};

// Function to update user availability
export const updateUserAvailability = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    // Check if req.user is defined
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const userId = req.user._id;  // Safely access _id since we've checked req.user is defined
    const { isAvailableForMeal } = req.body;  // Extract the new availability status from the request body

    // Update the user's availability status
    const user = await User.findById(userId);  // Fetch the user from the database using their ID

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isAvailableForMeal = isAvailableForMeal;  // Update the user's availability
    await user.save();  // Save the updated user document

    return res.status(200).json({ message: 'Availability updated successfully', isAvailableForMeal: user.isAvailableForMeal });
  } catch (error) {
    console.error('Error updating availability:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
