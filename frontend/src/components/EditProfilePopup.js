import { useContext, useState, useEffect } from "react";
import { PopupWithForm } from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpened, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext)
  useEffect(() => {
    setName(currentUser.name || "");
    setAbout(currentUser.about || "");
  }, [currentUser, isOpened]); 

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
 
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(name, about)
  } 

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        required
        minLength="2"
        maxLength="40"
        type="text"
        className="form__input form__input_name"
        placeholder="Имя"
        name="name"
        autoComplete="off"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <p className="error-message name-error"></p>
      <input
        minLength="2"
        maxLength="200"
        required
        type="text"
        className="form__input form__input_about"
        placeholder="О себе"
        name="about"
        autoComplete="off"
        value={about}
        onChange={e => setAbout(e.target.value)}
      />
      <p className="error-message about-error"></p>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
