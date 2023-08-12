import { PopupWithForm } from "./PopupWithForm";

export function DeleteCardPopup({ isOpened, onClose }) {
  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      buttonText="Да"
      isOpened={isOpened}
      onClose={onClose}
    >
      <p className="error-message link-error"></p>
    </PopupWithForm>
  );
}
