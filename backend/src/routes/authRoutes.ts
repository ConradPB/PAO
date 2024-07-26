import express from 'express';
import passport from 'passport';

const router = express.Router();

// Redirect to Google for authentication
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Handle the callback after Google has authenticated the user
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard'); // Redirect to your desired route
  }
);

// Logout the user
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

export default router;
