const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const ServerError = require('../errors/ServerError');

const saltRounds = 10;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => next(new ServerError('Ошибка сервера')));
};

module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Неверный запрос'));
      }
      return next(new ServerError('Ошибка сервера'));
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user.id;
  User.findById(userId)
    .orFail(() => next(new NotFoundError('Пользователь  не найден')))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Некорректный запрос'));
      }

      return next(err);
    });
};

// eslint-disable-next-line consistent-return
module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!password || !email) {
    return next(new BadRequestError('Введены не все данные'));
  }

  bcrypt.hash(password, saltRounds).then((hash) => {
    User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => {
        res.status(201).send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        });
      })
      .catch((err) => {
        if (err.code === 11000) {
          return next(new ConflictError('Вы уже зарегистрированы'));
        }
        if (err.name === 'ValidationError') {
          return next(new BadRequestError('Неверный запрос'));
        }
        return next(new ServerError('Ошибка сервера'));
      });
  }).catch((err) => next(err));
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User
    .findByIdAndUpdate(
      req.user.id,
      { name, about },
      { new: true, runValidators: true },
    )
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(BadRequestError('Введены некорректные данные'));
      }
      return next(err);
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User
    .findByIdAndUpdate(
      req.user.id,
      { avatar },
      { new: true, runValidators: true },
    ).orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Введены некорректные данные'));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ id: user.id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret', { expiresIn: '7d' });
      return res
        .status(200)
        .send({ token });
    })
    .catch(next);
};
