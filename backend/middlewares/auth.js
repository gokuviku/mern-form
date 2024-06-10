// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if token doesn't exist
    if (!token) {
        return res.status(401).json({ message: 'Authorization denied. No token provided' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, config.jwtSecret);

        // Add user to request object
        req.user = decoded.user;
        next();
    } catch (error) {
        console.error('Authentication failed:', error.message);
        res.status(401).json({ message: 'Authorization denied. Invalid token' });
    }
};
