import express from 'express';
import {
  createNotification,
  getNotifications,
  markNotificationAsRead,
} from '../controllers/notificationController.js';

const router = express.Router();

// Route to create a new notification
router.post('/create', createNotification);

// Route to get all notifications for a specific user
router.get('/:userId', getNotifications);

// Route to mark a notification as read
router.put('/:id/read', markNotificationAsRead);

export default router;
