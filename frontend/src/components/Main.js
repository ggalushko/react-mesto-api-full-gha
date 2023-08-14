import { useContext } from "react";
import defaultAvatar from "../images/user.jpg";
import { Card } from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  cards,
  onEditProfile,
  onAddCard,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;

  return (
    <main>
      <section className="profile">
        <div className="profile__dark-layout" onClick={onEditAvatar}>
          <img
            src={avatar || defaultAvatar}
            alt="картинка профиля"
            className="profile__picture"
          />
        </div>
        <h1 className="profile__name">{name}</h1>
        <p className="profile__about">{about}</p>
        <button
          type="button"
          className="profile__button profile__button_type_edit"
          onClick={onEditProfile}
        />
        <button
          type="button"
          className="profile__button profile__button_type_add"
          onClick={onAddCard}
        />
      </section>
      <section className="cards">
        {cards.map((card) => {
          return (
            <Card
              key={card.id}
              onClick={onCardClick}
              onLike={onCardLike}
              onDelete={onCardDelete}
              card={card}
            />
          );
        })}
      </section>
    </main>
  );
}
