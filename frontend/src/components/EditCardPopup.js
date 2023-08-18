import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditCardPopup(props) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function nameChange(e) {
    setName(e.target.value);
  }

  function linkChange(e) {
    setLink(e.target.value);
  }

  React.useEffect(() => {

    if (props.isOpen) {
      setName('');
      setLink('');
    }
  }, [props]);

  function handleSubmit(e) {

    e.preventDefault();

    props.onUpdateCard({
      name: name,
      link: link
    });
  }

  return (

    <PopupWithForm
      name={'edit-card-popup'}
      title={'Новое место'}
      formName={'editCardForm'}
      button={'Создать'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onCloseClick={props.onCloseClick}
      onSubmit={handleSubmit}
      >

      <input
        id="cardName-input"
        className="form-popup__input form-popup__input_type_card-name"
        autoComplete="off"
        required=""
        minLength={2}
        maxLength={40}
        name="name"
        placeholder="Название"
        onChange={nameChange}
        value={name}
      />
      <span className="form-popup__error cardName-input-error" />
      <input
        id="link-input"
        className="form-popup__input form-popup__input_type_link"
        autoComplete="off"
        required=""
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        onChange={linkChange}
        value={link}
      />
      <span className="form-popup__error link-input-error" />

    </PopupWithForm>
  );
}

export default EditCardPopup;
