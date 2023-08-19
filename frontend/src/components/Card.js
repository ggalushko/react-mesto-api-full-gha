import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

export function Card({ card, onClick, onLike, onDelete }) {
  const userContext = useContext(CurrentUserContext);

  const isOwn = card.owner._id === userContext._id;
  const isLiked = card.likes.some((i) => i._id === userContext._id);
  const cardLikeButtonClassName = `like-button ${
    isLiked ? "like-button_active" : ""
  }`;

  return (
    <article className="card">
      {isOwn ? (
        <button
          type="reset"
          className="card__delete-button"
          onClick={() => onDelete(card)}
        />
      ) : null}
      <img
        src={card.link}
        alt={card.name}
        className="card__image"
        onClick={onClick}
      />
      <div className="card__info">
        <h2 className="card__name">{card.name}</h2>
        <div className="button-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={() => onLike(card)}
          ></button>
          <p className="button-caption">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}
