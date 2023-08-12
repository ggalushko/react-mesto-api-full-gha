import { useContext, useEffect, useRef } from "react";
import { PopupWithForm } from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function ChangeAvatarPopup({ isOpened, onClose, onUpdateAvatar }) {
  const currentUser = useContext(CurrentUserContext);
  const inputRef = useRef()

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(inputRef.current.value);
  }
  useEffect(() => {
    inputRef.current.value = ""
  }, [currentUser]);

  return (
    <PopupWithForm
      name="change-avatar"
      title="Редактировать профиль"
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        required
        type="url"
        className="form__input form__input_link"
        placeholder="Ссылка на картинку"
        name="link"
        autoComplete="off"
        ref={inputRef}
      />
      <p className="error-message link-error"></p>
    </PopupWithForm>
  );
}
