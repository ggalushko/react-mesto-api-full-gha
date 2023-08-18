import Logo from '../images/logo.svg';
import { Route, Routes, NavLink } from "react-router-dom";

function Header(props) {
  return (
  <>
    <header className="header">  
      <img className="header__logo" src={Logo} alt="Логотип" />
      <Routes>
        <Route path="/" element={
          <div className="header__container">
          <p className="header__auth">{props.email}</p>
          <NavLink to="/sign-in" onClick={props.onClick} className="header__auth button-hovered">Выйти</NavLink>
        </div>} />

      	<Route path="/sign-up" element={<NavLink to="/sign-in" className="header__auth button-hovered">Войти</NavLink>} />
	
      	<Route path="/sign-in" element={<NavLink to="/sign-up" className="header__auth button-hovered">Регистрация</NavLink>}/>

      </Routes>
    </header>
  </>
  );
}

export default Header;
