const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

const jwtToken = (payload) => jwt.sign(payload, secretKey, { expiresIn: '7d' });

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new AuthError('Вы не авторизованы');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    return next(new AuthError('Некорректный токен'));
  }
  req.user = payload;
  return next();
};

module.exports = {
  auth,
  jwtToken,
};
