import CorrectAuth from '../images/auth-correct.svg';
import ErrorAuth from '../images/auth-error.svg';

function InfoTooltipPopup(props) {
  return (
  <>
    <div className={`popup form-popup ${props.isOpen ? `popup_opened` : ''}`} onClick={props.onCloseClick}>
      <div className="form-popup__container form-popup__complete">
        <button className="button-close button-hovered" type="button" onClick={props.onClose} />
        <img alt={props.success ? 'Успех' : 'Ошибка' } src={props.success ? CorrectAuth : ErrorAuth }/>
        <h2 className="form-popup__title form-popup__title-complete">{props.success ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.' }</h2>
      </div>
    </div>
  </>
  );
}

export default InfoTooltipPopup;
