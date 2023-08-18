import React from 'react';
import Card from './Card.js';
import CurrentUserContext from '../context/CurrentUserContext.js'

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
  <>

    <main className="content">

      <section className="profile">

        <button onClick={props.onEditAvatar} className="profile__avatar-button" type="button">
          <img className="profile__avatar-image" src={currentUser.avatar} alt="Аватар" />
        </button>

        <div className="profile__info">
          <h1 className="profile__info-title text-overflow">{currentUser.name}</h1>
          <button onClick={props.onEditProfile} className="profile__button profile__button_responsible_edit-info button-hovered" type="button" />
          <p className="profile__info-subtitle text-overflow">{currentUser.about}</p>
        </div>

        <button onClick={props.onAddPlace} className="profile__button profile__button_responsible_add-card button-hovered" type="button" />
      </section>

      <section className="gallery">
      	
        {props.cards.map((card) => (
          <Card
          	key={card._id}
          	card={card}
          	name={card.name}
          	link={card.link}
            likes={card.likes.length}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}

      </section>
    </main>
</>
  );
}

export default Main;
