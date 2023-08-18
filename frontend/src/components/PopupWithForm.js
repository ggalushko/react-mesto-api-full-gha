function PopupWithForm(props) {
  return (
  <div className={`popup form-popup ${props.name} ${props.isOpen ? `popup_opened` : ''}`} onClick={props.onCloseClick}>
    <div className="form-popup__container">
      <button className="button-close button-hovered" type="button" onClick={props.onClose} />
      <h2 className="form-popup__title">{props.title}</h2>
      <form className="form-popup__form" action="#" name={props.formName} onSubmit={props.onSubmit}>
        {props.children}
        <button className="form-popup__button-submit" type="submit">{props.button}</button>
      </form>
    </div>
  </div>
  );
}

export default PopupWithForm;