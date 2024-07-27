import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import Task from '../models/Task.js';
import mongoose from 'mongoose';
import { IUser } from '../models/User.js';

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized, no user found');
  }
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
});

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { title, description, dueDate } = req.body;

  if (!title || !description || !dueDate) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const task = new Task({
    title,
    description,
    dueDate,
    user: req.user._id,
  });

  const createdTask = await task.save();
  res.status(201).json(createdTask);
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { title, description, dueDate } = req.body;

  const trimmedId = id.trim();

  if (!mongoose.Types.ObjectId.isValid(trimmedId)) {
    res.status(400);
    throw new Error('Invalid task ID');
  }

  const task = await Task.findById(trimmedId);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  if (task.user.toString() !== req.user!._id.toString()) {
    res.status(401);
    throw new Error('User not authorized');
  }

  task.title = title || task.title;
  task.description = description || task.description;
  task.dueDate = dueDate || task.dueDate;

  const updatedTask = await task.save();
  res.status(200).json(updatedTask);
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized, no user found');
  }

  const task = await Task.findById(req.params.id);

  if (task) {
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('User not authorized');
    }
    await Task.deleteOne({ _id: req.params.id });
    res.json({ message: 'Task removed' });
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

export { getTasks, createTask, updateTask, deleteTask };
