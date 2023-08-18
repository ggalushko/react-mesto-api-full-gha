import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from '../context/CurrentUserContext.js'

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function nameChange(e) {
    setName(e.target.value);
  }

  function descriptionChange(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {

    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, props]);

  function handleSubmit(e) {

    e.preventDefault();

    props.onUpdateUser({
      fullName: name,
      specialty: description
    });
  }

  return (

    <PopupWithForm
      name={'edit-profile-popup'}
      title={'Редактировать профиль'}
      formName={'editProfileForm'}
      button={'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onCloseClick={props.onCloseClick}
      onSubmit={handleSubmit}
      >

      <input
        id="fullName-input"
        className="form-popup__input form-popup__input_type_profile-name"
        autoComplete="off"
        required=""
        minLength={2}
        maxLength={40}
        name="fullName"
        placeholder="Имя"
        value={name}
        onChange={nameChange}
      />
      <span className="form-popup__error fullName-input-error" />
      
      <input
        id="specialty-input"
        className="form-popup__input form-popup__input_type_specialty"
        autoComplete="off"
        required=""
        minLength={2}
        maxLength={200}
        name="specialty"
        placeholder="О себе"
        value={description}
        onChange={descriptionChange}
      />
      <span className="form-popup__error specialty-input-error" />

    </PopupWithForm>
  );
}

export default EditProfilePopup;