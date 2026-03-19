import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/search");
  };

  return (
    <div>
      <h2>Авторизация</h2>

      <input type="text" placeholder="Логин" />
      <br />
      <input type="password" placeholder="Пароль" />
      <br />

      <button onClick={handleLogin}>Войти</button>
    </div>
  );
}

export default Login;