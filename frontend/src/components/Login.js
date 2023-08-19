import { useState } from "react";

export default function Login({ handleSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      handleSignIn(email, password);
    }
  };

  return (
    <div className="form-container">
      <form name="login-form" className="login-form" onSubmit={onSubmit}>
        <h2 className="login-form__header">Вход</h2>
        <input
          className="login-form__input"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-form__input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="login-form__button"
          id="auth-button-save-login"
        >
          Войти
        </button>
      </form>
    </div>
  );
}
