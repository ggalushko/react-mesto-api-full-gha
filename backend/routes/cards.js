const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createCard,
  getCards,
  deleteCard,
  handleLike,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);

cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    link: Joi.string().required().pattern(/https?:\/\/(www\.)?[-\w@:%\.\+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-\w()@:%\.\+~#=//?&]*)/i),
  }),
}), createCard);

cardsRouter.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
}), deleteCard);

cardsRouter.put('/:_id/likes', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
}), handleLike);

cardsRouter.delete('/:_id/likes', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
}), handleLike);

module.exports = cardsRouter;
