import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const isAuth = !!token;
  const [currentCard, setCurrentCard] = useState(0);
  
  const reasons = [
    { icon: '⚡', text: 'Высокая и оперативная скорость обработки заявки' },
    { icon: '📊', text: 'Огромная комплексная база данных' },
    { icon: '🔒', text: 'Защита конфиденциальных сведений' },
    { icon: '🎯', text: 'Точный поиск по реквизитам' },
    { icon: '📈', text: 'Аналитика рисков и тональности' }
  ];
  
  const tariffs = [
    { name: 'Beginner', price: '799 ₽', color: '#f5f5f5', accent: '#e0e0e0' },
    { name: 'Pro', price: '1299 ₽', color: '#e8f5e9', accent: '#4caf50' },
    { name: 'Business', price: '2379 ₽', color: '#fff3e0', accent: '#ff9800' }
  ];
  
  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % reasons.length);
  };
  
  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + reasons.length) % reasons.length);
  };
  
  const getVisibleCards = () => {
    const prev = (currentCard - 1 + reasons.length) % reasons.length;
    const next = (currentCard + 1) % reasons.length;
    return [reasons[prev], reasons[currentCard], reasons[next]];
  };
  
  return (
    <div className="home-page">
      <main>
        <section className="hero">
          <div className="container hero-container">
            <div className="hero-content">
              <h1 className="hero-title">
                СЕРВИС ПО ПОИСКУ<br />
                ПУБЛИКАЦИЙ О КОМПАНИИ
              </h1>
              <p className="hero-description">
                Комплексный анализ публикаций, получение данных<br />
                в пару кликов
              </p>
              {isAuth && (
                <button 
                  className="hero-btn"
                  onClick={() => navigate('/search')}
                >
                  Запросить данные
                </button>
              )}
            </div>
            <div className="hero-image">
              <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
                <circle cx="200" cy="200" r="180" fill="#029491" fillOpacity="0.1"/>
                <path d="M200 80 L280 140 L280 260 L200 320 L120 260 L120 140 L200 80Z" fill="#029491" fillOpacity="0.3" stroke="#029491" strokeWidth="2"/>
                <circle cx="200" cy="200" r="40" fill="#029491"/>
              </svg>
            </div>
          </div>
        </section>
        
        <section className="reasons">
          <div className="container">
            <h2 className="section-title">Почему именно мы</h2>
            <div className="carousel">
              <button className="carousel-arrow left" onClick={prevCard}>‹</button>
              <div className="carousel-cards">
                {getVisibleCards().map((card, idx) => (
                  <div key={idx} className={`carousel-card ${idx === 1 ? 'center' : ''}`}>
                    <div className="card-icon">{card.icon}</div>
                    <p className="card-text">{card.text}</p>
                  </div>
                ))}
              </div>
              <button className="carousel-arrow right" onClick={nextCard}>›</button>
            </div>
          </div>
        </section>
        
        <section className="tariffs">
          <div className="container">
            <h2 className="section-title">Наши тарифы</h2>
            <div className="tariffs-grid">
              {tariffs.map((tariff, idx) => {
                const isCurrentTariff = isAuth && idx === 1;
                return (
                  <div key={idx} className={`tariff-card ${isCurrentTariff ? 'current' : ''}`} style={{ background: tariff.color }}>
                    {isCurrentTariff && <div className="tariff-badge">Текущий тариф</div>}
                    <h3 className="tariff-name">{tariff.name}</h3>
                    <div className="tariff-price">{tariff.price}</div>
                    <p className="tariff-description">Описание тарифа</p>
                    <button className="tariff-btn" style={{ background: isCurrentTariff ? tariff.accent : '#029491', cursor: 'default' }}>
                      {isCurrentTariff ? 'Перейти в личный кабинет' : 'Подробнее'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      
      <footer className="footer">
        <div className="container footer-container">
          <div className="footer-logo">СКАН</div>
          <div className="footer-copyright">© {new Date().getFullYear()} Все права защищены</div>
        </div>
      </footer>
    </div>
  );
}

export default Home;