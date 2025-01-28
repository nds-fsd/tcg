const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET_KEY;

const jwtMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.status(401).json({ error: 'Unauthorized: missing header' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized: missing token' });

  let tokenPayload;

  try {
    const tokenPayload = jwt.verify(token, jwtSecret);
    req.jwtPayload = tokenPayload;
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: invalid token' });
  }

  req.jwtPayload = tokenPayload;
  next();
};

const signToken = (payload, expiresIn = '1d') => {
  return jwt.sign(payload, jwtSecret, { expiresIn });
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};

module.exports = {
  jwtMiddleware,
  signToken,
  verifyToken,
};
