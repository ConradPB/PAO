import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Task from '../models/Task.js';
import { IUser } from '../models/User.js';

// Ensure Request includes IUser
interface AuthenticatedRequest extends Request {
  user?: IUser;
}

// @desc    Get tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized, no user found');
  }
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
});

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { title, description, completed } = req.body;

  if (!title || !description) {
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
    completed: completed || false,
    user: req.user._id,
  });

  const createdTask = await task.save();
  res.status(201).json(createdTask);
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const task = await Task.findById(id);

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
  task.completed = completed !== undefined ? completed : task.completed;

  const updatedTask = await task.save();
  res.status(200).json(updatedTask);
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  if (task.user.toString() !== req.user!._id.toString()) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await task.remove();
  res.json({ message: 'Task removed' });
});

export { getTasks, createTask, updateTask, deleteTask };
