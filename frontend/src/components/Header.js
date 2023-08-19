import logo from "../images/logo.svg";
import { useLocation, useNavigate } from "react-router-dom";

export function Header({ email, handleLogout }) {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  let caption = "";

  if (location === "/register") {
    caption = "Войти";
  } else if (location === "/login") {
    caption = "Регистрация";
  }

  return (
    <header className="header">
      <img src={logo} alt="Логотип Mesto Russia" className="header__logo" />
      <a
        className="header__caption"
        onClick={() => {
          if (location === "/register") {
            navigate("/login");
          } else if (location === "/login") {
            navigate("/register");
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
