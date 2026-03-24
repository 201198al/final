import { useState } from 'react';
import './Login.css';

function Login() {
  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (loginValue && password) {
      localStorage.setItem('accessToken', 'demo-token');
      window.location.href = '/search';
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-card">
          <div className="input-group">
            <label>Логин или номер телефона:</label>
            <input
              type="text"
              value={loginValue}
              onChange={(e) => setLoginValue(e.target.value)}
              placeholder="Введите любые данные"
            />
          </div>
          
          <div className="input-group">
            <label>Пароль:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите любые данные"
            />
          </div>
          
          <button 
            className={`login-btn ${loginValue && password ? 'active' : ''}`}
            onClick={handleLogin}
            disabled={!loginValue || !password}
          >
            Войти
          </button>
          
          <div className="demo-note">
            🔓 Демо-режим: введите любые данные для входа
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;