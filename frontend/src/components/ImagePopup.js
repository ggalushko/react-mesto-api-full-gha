export function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`dark-layout popup popup_image ${card.name && "popup_opened"}`}
      onClick={onClose}
    >
      <div className="image-container">
        <button type="reset" className="button-close"></button>
        <img className="image-full" alt={card.name || ""} src={card.link || ""} />
        <p className="image-container__caption">{card.name || ""}</p>
      </div>
    </div>
  );
}
