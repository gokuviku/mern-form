// backend/routes/users.js
// backend/routes/users.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth'); 
const User = require('../models/User');

// Your route definitions here


// @route GET /api/users/:id
// @desc Get user by ID
// @access Private
router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Fetch user failed:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
