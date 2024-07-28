import { Response, NextFunction } from 'express';
import Task from '../models/Task.js';
import { AuthenticatedRequest } from '../types/custom.js';

// Create Task
export const createTask = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { title, description, dueDate } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const task = new Task({
      user: req.user._id,
      title,
      description,
      dueDate,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// Get Tasks
export const getTasks = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const tasks = await Task.find({ user: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// Update Task
export const updateTask = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const taskId = req.params.id;
    const updates = req.body;

    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: req.user._id },
      updates,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// Delete Task
export const deleteTask = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const taskId = req.params.id;

    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const task = await Task.findOneAndDelete({ _id: taskId, user: req.user._id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};
