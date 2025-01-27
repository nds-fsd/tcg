const addDateMiddleware = (req, res, next) => {
  req.requestInstant = new Date();
  next();
};

function validatePassword(password) {
  const pattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/);
  return pattern.test(password);
}

function validateEmail(password) {
  const pattern = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
  return pattern.test(password);
}

const validateUser = (req, res, next) => {
  const user = req.body;

  if (user.userName === undefined || user.userName.length === 0) {
    res.status(400).send({ message: 'userName required' });
    return;
  }
  if (user.password === undefined) {
    res.status(400).send({ message: 'password required' });
    return;
  }
  if (!validatePassword(user.password)) {
    res
      .status(400)
      .send({
        message:
          'password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number',
      });
    return;
  }
  if (user.email === undefined) {
    res.status(400).send({ message: 'email required' });
    return;
  }
  if (!validateEmail(user.email)) {
    res.status(400).send({ message: 'email format is not correct' });
    return;
  }

  next();
};

module.exports = {
  addDateMiddleware,
  validatePassword,
  validateEmail,
  validateUser,
};
