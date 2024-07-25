import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Event from '../models/Event.js';
import mongoose from 'mongoose';

// @desc    Get all events
// @route   GET /api/events
// @access  Private
const getEvents = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized, no user found');
  }
  const events = await Event.find({ user: req.user._id });
  res.json(events);
});

// @desc    Create a new event
// @route   POST /api/events
// @access  Private
const createEvent = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, date, recurring, frequency } = req.body;

  if (!title || !description || !date) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const event = new Event({
    title,
    description,
    date,
    recurring,
    frequency: recurring ? frequency : null,
    user: req.user._id,
  });

  const createdEvent = await event.save();
  res.status(201).json(createdEvent);
});

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private
const updateEvent = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, date, recurring, frequency } = req.body;

  const trimmedId = id.trim();

  if (!mongoose.Types.ObjectId.isValid(trimmedId)) {
    res.status(400);
    throw new Error('Invalid event ID');
  }

  const event = await Event.findById(trimmedId);

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  if (event.user.toString() !== req.user!._id.toString()) {
    res.status(401);
    throw new Error('User not authorized');
  }

  event.title = title || event.title;
  event.description = description || event.description;
  event.date = date || event.date;
  event.recurring = recurring !== undefined ? recurring : event.recurring;
  event.frequency = recurring ? frequency : null;

  const updatedEvent = await event.save();
  res.status(200).json(updatedEvent);
});

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private
const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized, no user found');
  }

  const event = await Event.findById(req.params.id);

  if (event) {
    if (event.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('User not authorized');
    }
    await Event.deleteOne({ _id: req.params.id });
    res.json({ message: 'Event removed' });
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

export { getEvents, createEvent, updateEvent, deleteEvent };
