import cron from 'node-cron';
import Event from '../models/Event.js';

const startCountdown = () => {
  cron.schedule('* * * * *', async () => { // Runs every minute
    const now = new Date();
    const events = await Event.find({ date: { $gte: now } });

    events.forEach(event => {
      const timeDifference = new Date(event.date).getTime() - now.getTime();
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      console.log(`Event: ${event.title}, Countdown: ${hours}h ${minutes}m ${seconds}s`);
    });
  });
};

export default startCountdown;
