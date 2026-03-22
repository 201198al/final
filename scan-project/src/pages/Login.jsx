import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!login || !password) return;

    try {
      const response = await fetch(
        "https://gateway.scan-interfax.ru/api/v1/account/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            login: login,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка авторизации");
      }

      const data = await response.json();

      
      localStorage.setItem("token", data.accessToken);

      
      navigate("/search");
    } catch (err) {
      setError("Неверный логин или пароль");
    }
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

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;