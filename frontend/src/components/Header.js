import logo from "../images/logo.svg";
import { useLocation, useNavigate } from "react-router-dom";

export function Header({ email, handleLogout }) {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  let caption = "";

  if (location === "/signup") {
    caption = "Войти";
  } else if (location === "/signin") {
    caption = "Регистрация";
  }

  return (
    <header className="header">
      <img src={logo} alt="Логотип Mesto Russia" className="header__logo" />
      <a
        className="header__caption"
        onClick={() => {
          if (location === "/signup") {
            navigate("/signin");
          } else if (location === "/signin") {
            navigate("/signup");
          }
        }}
      >
        {caption}
      </a>
      <p className="header__email">{email}</p>
      {location === "/" && (
        <a className="header__logout" onClick={handleLogout}>
          Выйти
        </a>
      )}
    </header>
  );
}
