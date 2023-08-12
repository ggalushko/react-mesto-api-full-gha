import ok from "../images/tooltipOk.svg";
import err from "../images/tooltipError.svg";

export function InfoTooltip({ isOpened, onClose, isOk }) {
  return (
    <div className={`popup ${isOpened && "popup_opened"}`} onClick={onClose}>
      <div className="form-container">
        <button type="reset" className="button-close" />
        <div className="form-wrapper tooltip">
          <img src={isOk ? ok : err} className="tooltip__image"/>
          <h2 className="tooltip__text">
            {isOk
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </h2>
        </div>
      </div>
    </div>
  );
}
