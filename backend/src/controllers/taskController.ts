import { Request, Response } from 'express';
import Task from '../models/Task.js';
import { AuthenticatedRequest } from '../types/custom.js';

export const getTasks = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    const tasks = await Task.find({ user: req.user?._id });
    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const createTask = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    const { title, description } = req.body;
    const task = new Task({
      user: req.user?._id,
      title,
      description,
    });
    const createdTask = await task.save();
    return res.status(201).json(createdTask);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getTaskById = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    const task = await Task.findById(req.params.id);

    if (task && task.user?.toString() === req.user?._id.toString()) {
      return res.json(task);
    } else {
      return res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateTask = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    const task = await Task.findById(req.params.id);

    if (task && task.user?.toString() === req.user?._id.toString()) {
      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      const updatedTask = await task.save();
      return res.json(updatedTask);
    } else {
      return res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTask = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    const task = await Task.findById(req.params.id);

    if (task && task.user?.toString() === req.user?._id.toString()) {
      await Task.deleteOne({ _id: task._id });
      return res.json({ message: 'Task removed' });
    } else {
      return res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};
