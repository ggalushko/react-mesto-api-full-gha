const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user.id });

    res.status(201).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('некорректные данные'));
    } else {
      next(err);
    }
  }
};

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});

    res.send(cards);
  } catch (err) {
    next(err);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      throw new NotFoundError('Карточка не найдена.');
    }

    if (card.owner.toString() !== req.user.id) {
      throw new ForbiddenError('Нельзя удалять чужие карточки');
    }

    await Card.findByIdAndDelete(req.params.id);

    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('некорректные данные'));
    } else {
      next(err);
    }
  }
};

const handleLike = async (req, res, next) => {
  try {
    let action;

    if (req.method === 'PUT') {
      action = '$addToSet';
    }

    if (req.method === 'DELETE') {
      action = '$pull';
    }

    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { [action]: { likes: req.user.id } },
      { new: true },
    );

    if (!card) {
      throw new NotFoundError('карточка не найдена');
    }

    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('некорректные данные'));
    } else {
      next(err);
    }
  }
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  handleLike,
};
