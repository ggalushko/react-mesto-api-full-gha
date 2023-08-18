function ImagePopup(props) {
  return (
  <>
    <div className={`popup image-popup ${props.card.name.length > 0 ? `popup_opened` : ''}`} onClick={props.onCloseClick}>
      <figure className="image-popup__container">
        <button className="button-close button-hovered" type="button" onClick={props.onClose}/>
        <img className="image-popup__img" src={props.card.link} alt={props.card.name} />
        <figcaption className="image-popup__title">{props.card.name}</figcaption>
      </figure>
    </div>
  </>

  );
}

export default ImagePopup;
