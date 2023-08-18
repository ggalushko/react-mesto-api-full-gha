import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {

  const ref = React.useRef();

    React.useEffect(() => {

      if (props.isOpen) {
        ref.current.value = '';
      }

    }, [props]);

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: ref.current.value,
    });
  }

  return (

    <PopupWithForm
      name={'edit-avatar-popup'}
      title={'Обновить аватар'}
      formName={'editAvatarForm'}
      button={'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onCloseClick={props.onCloseClick}
      onSubmit={handleSubmit}
      >

      <input
        id="avatar-input"
        className="form-popup__input form-popup__input_type_avatar"
        autoComplete="off"
        required=""
        minLength={2}
        maxLength={200}
        name="avatar"
        placeholder="Ссылка на картинку для аватара"
        type="url"
        ref={ref}
      />
      <span className="form-popup__error avatar-input-error" />

    </PopupWithForm>
  );
}

export default EditAvatarPopup;
