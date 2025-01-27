const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const jwtSecret = process.env.JWT_SECRET_KEY;

const jwtMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) res.status(401).json({ error: 'Sin autorización: faltan los headers' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Sin autorización: falta el token' });

  let tokenPayload;

  try {
    tokenPayload = jwt.verify(token, jwtSecret);
  } catch (error) {
    return res.status(401).json({ error: 'Sin autorización' });
  }

  req.jwtPayload = tokenPayload;
  next();
};

module.exports = {
  jwtMiddleware,
};
