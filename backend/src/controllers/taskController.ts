import { Request, Response } from 'express';
import Task from '../models/Task.js';

const createTask = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const task = new Task({
    title,
    description,
    user: req.user._id
  });
  const createdTask = await task.save();
  res.status(201).json(createdTask);
};

const getTasks = async (req: Request, res: Response) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};

const updateTask = async (req: Request, res: Response) => {
  const { title, description, completed } = req.body;
  const task = await Task.findById(req.params.id);

  if (task && task.user.toString() === req.user._id.toString()) {
    task.title = title;
    task.description = description;
    task.completed = completed;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  const task = await Task.findById(req.params.id);

  if (task && task.user.toString() === req.user._id.toString()) {
    await task.remove();
    res.json({ message: 'Task removed' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

export { createTask, getTasks, updateTask, deleteTask };
