import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const [accountInfo, setAccountInfo] = useState(null);

  
  useEffect(() => {
    const checkToken = () => {
      setToken(localStorage.getItem('accessToken'));
    };
    window.addEventListener('storage', checkToken);
    return () => window.removeEventListener('storage', checkToken);
  }, []);

  
  useEffect(() => {
    if (token && !accountInfo) {
      setTimeout(() => {
        setAccountInfo({ usedCompanyCount: 5, companyLimit: 100 });
      }, 500);
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setToken(null);
    setAccountInfo(null);
    navigate('/');
    window.location.reload();
  };

  const isAuth = !!token;

  return (
    <header style={{
      background: '#fff',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '16px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div 
          onClick={() => navigate('/')}
          style={{ fontSize: '24px', fontWeight: '700', color: '#029491', cursor: 'pointer' }}
        >
          СКАН
        </div>
        
        <nav style={{ display: 'flex', gap: '30px' }}>
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} style={{ textDecoration: 'none', color: '#333' }}>Главная</a>
          <span style={{ color: '#999', cursor: 'default' }}>Тарифы</span>
          <span style={{ color: '#999', cursor: 'default' }}>FAQ</span>
        </nav>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {isAuth ? (
            <>
              {accountInfo && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '4px',
                  fontSize: '12px',
                  background: '#f5f5f5',
                  padding: '8px 16px',
                  borderRadius: '8px'
                }}>
                  <span style={{ color: '#029491', fontWeight: '600' }}>Использовано: {accountInfo.usedCompanyCount}</span>
                  <span style={{ color: '#666' }}>Лимит: {accountInfo.companyLimit}</span>
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#029491', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  👤
                </div>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Пользователь</span>
                <button
                  onClick={handleLogout}
                  style={{
                    background: 'none',
                    border: '1px solid #029491',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    color: '#029491'
                  }}
                >
                  Выйти
                </button>
              </div>
            </>
          ) : (
            <>
              <span style={{ color: '#999', cursor: 'default' }}>Зарегистрироваться</span>
              <button
                onClick={() => navigate('/login')}
                style={{
                  background: 'none',
                  border: '1px solid #029491',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  color: '#029491'
                }}
              >
                Войти
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;