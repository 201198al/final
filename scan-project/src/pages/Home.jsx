import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="hero">
        <div className="hero-text">
          <h1>Сервис анализа публикаций о компании</h1>

          <p>
            Быстро находите информацию о компаниях и анализируйте новости
          </p>

          <button onClick={() => navigate("/search")}>
            Начать поиск
          </button>
        </div>

        <img
          src="https://via.placeholder.com/400x300"
          alt="banner"
        />
      </div>
    </div>
  );
}

export default Home;