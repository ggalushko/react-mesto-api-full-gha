export function PopupWithForm({
  title,
  name,
  buttonText = "Сохранить",
  isOpened,
  onClose,
  onSubmit,
  children,
}) {


  return (
    <div
      className={`popup popup_${name} ${isOpened && "popup_opened"}`}
      onClick={onClose}
    >
      <div className="form-container">
        <button type="reset" className="button-close" />
        <div className="form-wrapper">
          <form action="/" className="form" name={`form-${name}`} onSubmit={onSubmit}>
            <h2 className="form__header">{title}</h2>
            {children}
            <button type="submit" className="form__button-save">
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
