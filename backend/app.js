const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const { celebrate, Joi } = require('celebrate');
const usersRouter = require('./routes/users');
const NotFoundError = require('./errors/NotFoundError');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors({
  origin: [
    'localhost:3000',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'https://127.0.0.1:3000',
    'https://127.0.0.1:3001',
    'http://localhost:3000',
    'https://localhost:3000',
    'http://localhost:3001',
    'https://localhost:3001',
    'https://mestofull.nomoreparties.co',
    'https://api.mestofull.nomoreparties.co',
    'http://mestofull.nomoreparties.co',
    'http://api.mestofull.nomoreparties.co',
    'http://praktikum.tk',
    'localhost:3000',
    'localhost:3001',
  ],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Authorization', 'accept'],
  method: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().pattern(/https?:\/\/(www\.)?[-\w@:%\.\+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-\w()@:%\.\+~#=//?&]*)/i),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);

app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Ничего не найдено'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

const connect = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
      useNewUrlParser: true,
    });
    await app.listen(PORT);
  } catch (err) {
    console.log(err);
  }
};

connect();
