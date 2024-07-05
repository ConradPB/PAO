import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Task from '../models/Task.js';

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req: Request, res: Response) => {
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
const createTask = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized, no user found');
  }
  const { title, description } = req.body;

  const task = new Task({
    user: req.user._id,
    title,
    description,
  });

  const createdTask = await task.save();
  res.status(201).json(createdTask);
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req: Request, res: Response) => {
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

export { getTasks, createTask, deleteTask };
