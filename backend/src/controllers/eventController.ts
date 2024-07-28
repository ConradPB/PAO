import { Response, NextFunction } from 'express';
import Event from '../models/Event.js';
import { AuthenticatedRequest } from '../types/custom.js';

// Create Event
export const createEvent = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { title, description, date, recurring, frequency } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const event = new Event({
      user: req.user._id,
      title,
      description,
      date,
      recurring,
      frequency,
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

// Get Events
export const getEvents = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const events = await Event.find({ user: req.user._id });
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

// Update Event
export const updateEvent = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const eventId = req.params.id;
    const updates = req.body;

    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const event = await Event.findOneAndUpdate(
      { _id: eventId, user: req.user._id },
      updates,
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

// Delete Event
export const deleteEvent = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const eventId = req.params.id;

    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const event = await Event.findOneAndDelete({ _id: eventId, user: req.user._id });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    next(error);
  }
};
