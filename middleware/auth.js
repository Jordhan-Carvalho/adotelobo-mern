const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  // Check if no token
  if (!token) return res.status(401).json({ msg: ' No token, auth denied' });
  // verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ msg: 'token not valid' });
  }
};
