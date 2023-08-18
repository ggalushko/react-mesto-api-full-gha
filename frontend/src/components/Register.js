import React from 'react';
import { NavLink } from 'react-router-dom';

function Register(props) {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    function usernameChange(e) {
      setUsername(e.target.value);
    }
  
    function passwordChange(e) {
      setPassword(e.target.value);
    }

    function handleSubmit(e){
      e.preventDefault();
      props.onRegister(username, password)
    }

  return(
    <main className="auth">
      <section className="auth__container">

        <h2 className="auth__title">Регистрация</h2>

        <form onSubmit={handleSubmit} className="auth__form">

          <input className="auth__input" required id="username" name="username" type="email" placeholder="Email" value={username} onChange={usernameChange} />

          <input className="auth__input" required id="password" name="password" type="password" placeholder="Пароль" value={password} onChange={passwordChange} />

          <button type="submit" className="auth__button">Зарегистрироваться</button>

        </form>

        <NavLink className="auth__switch button-hovered" to="/sign-in">Уже зарегистрированы? Войти</NavLink>
      </section>
    </main>
  );
}

export default Register;