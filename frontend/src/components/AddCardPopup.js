import { useRef, useEffect } from "react";
import { PopupWithForm } from "./PopupWithForm";

export function AddCardPopup({ isOpened, onClose, onAddPlace }) {
  const nameRef = useRef();
  const linkRef = useRef();
  useEffect(() => {
    nameRef.current.value = "";
    linkRef.current.value = "";
  }, [isOpened]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name: nameRef.current.value, link: linkRef.current.value });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        required
        minLength="2"
        maxLength="30"
        type="text"
        className="form__input form__input_name"
        placeholder="Название"
        name="name"
        autoComplete="off"
        ref={nameRef}
      />
      <p className="error-message name-error"></p>
      <input
        required
        type="url"
        className="form__input form__input_link"
        placeholder="Ссылка на картинку"
        name="link"
        autoComplete="off"
        ref={linkRef}
      />
      <p className="error-message link-error"></p>
    </PopupWithForm>
  );
}
