import { Request, Response } from 'express';
import Event from '../models/Event.js';
import { AuthenticatedRequest } from '../types/custom.js';

export const getEvents = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    const events = await Event.find({ user: req.user?._id });
    return res.json(events);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const createEvent = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    const { title, description, date, frequency, recurring } = req.body;
    const event = new Event({
      user: req.user?._id,
      title,
      description,
      date,
      frequency,
      recurring,
    });
    const createdEvent = await event.save();
    return res.status(201).json(createdEvent);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getEventById = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    const event = await Event.findById(req.params.id);

    if (event && event.user?.toString() === req.user?._id.toString()) {
      return res.json(event);
    } else {
      return res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateEvent = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    const event = await Event.findById(req.params.id);

    if (event && event.user?.toString() === req.user?._id.toString()) {
      event.title = req.body.title || event.title;
      event.description = req.body.description || event.description;
      event.date = req.body.date || event.date;
      event.frequency = req.body.frequency || event.frequency;
      event.recurring = req.body.recurring !== undefined ? req.body.recurring : event.recurring;
      const updatedEvent = await event.save();
      return res.json(updatedEvent);
    } else {
      return res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteEvent = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    const event = await Event.findById(req.params.id);

    if (event && event.user?.toString() === req.user?._id.toString()) {
      await Event.deleteOne({ _id: event._id });
      return res.json({ message: 'Event removed' });
    } else {
      return res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
