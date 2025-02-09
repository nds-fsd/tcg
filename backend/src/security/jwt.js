const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET_KEY;

const jwtMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    console.log("🔴 Sin autorización: falta header");
    return res.status(401).json({ error: 'Sin autorización: falta header' });
  }
  
  const token = authHeader.split(' ')[1];
  if (!token) {
    console.log("🔴 Sin autorización: falta token");
    return res.status(401).json({ error: 'Sin autorización: falta token' });
  }

  try {
    const tokenPayload = jwt.verify(token, jwtSecret);
    console.log("🔹 Token decodificado:", tokenPayload);

    req.user = tokenPayload;
    next();
  } catch (e) {
    console.log("🔴 Sin autorización: token inválido");
    return res.status(401).json({ e: 'Sin autorización: token inválido' });
  }
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
