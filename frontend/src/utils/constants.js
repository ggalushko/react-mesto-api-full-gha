/*-----------------------------------------------------------------------------------------------------------------------------------*/
//-------------------------------------------------------------------- Конфиг для валидации форм

export const formConfig = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button-save",
  inactiveButtonClass: "form__button-save_disabled",
  inputErrorClass: "form__input_error",
  errorClass: "error-message_active",
};

//-------------------------------------------------------------------- Селекторы

export const cardTemplateSelector = "#card-template";
export const nameInput = document
  .querySelector(".popup_edit-profile")
  .querySelector(".form__input_name");
export const infoInput = document.querySelector(".form__input_about");
export const avatarClickArea = document.querySelector(".profile__dark-layout");
export const editProfileBtn = document.querySelector(
  ".profile__button_type_edit"
);
export const addCardBtn = document.querySelector(".profile__button_type_add");