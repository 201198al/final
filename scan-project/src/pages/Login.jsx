import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!login || !password) return;

    localStorage.setItem("token", "123");
    navigate("/search");
  };

  return (
    <div className="container">
      <h2>Авторизация</h2>

      <input
        type="text"
        placeholder="Логин"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />

      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin} disabled={!login || !password}>
        Войти
      </button>

      <p style={{ fontSize: "12px", opacity: 0.6 }}>
        Демо-версия: введите любые данные
      </p>
    </div>
  );
}

export default Login;