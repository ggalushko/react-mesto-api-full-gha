import React from 'react';
import CurrentUserContext from '../context/CurrentUserContext.js'

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;

  const isLiked = props.card.likes.some(i => i === currentUser._id);

  const cardLikeButtonClassName = (`gallery__like-button ${isLiked && 'gallery__like-button_type_active'}`);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card._id);
  }

  return (
  <>
  <div className="gallery__card">
    <img className="gallery__img" src={props.link} alt={props.name} onClick={handleClick} />
    {isOwn && <button className="gallery__trash-button" type="button" onClick={handleDeleteClick}></button>}
    <div className="gallery__description">
      <h2 className="gallery__title text-overflow">{props.name}</h2>
      <div className="gallery__like">
        <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
        <p className="gallery__like-amount">{props.likes}</p>
      </div>
    </div>
  </div>
  </>
  );
}

export default Card;