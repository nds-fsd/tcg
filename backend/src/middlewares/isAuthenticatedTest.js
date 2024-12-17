const isAuthenticated = (req, res, next) => {
  // Placeholder for logged-in user (replace with real auth later)
  req.user = { _id: '64d2f9a72c1234567890ab01', username: 'testuser' };
  next();
};

module.exports = isAuthenticated;
