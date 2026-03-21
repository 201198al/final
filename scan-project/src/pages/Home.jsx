import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <header>
        <h1>SCAN</h1>
        <nav>
          <Link to="/login">Войти</Link>
        </nav>
      </header>

      <section>
        <h2>Сервис по поиску публикаций</h2>
        <p>Анализируем новости и данные</p>
        <button onClick={() => navigate("/search")}>
          Начать поиск
        </button>
      </section>

      <section>
        <h2>Наши тарифы</h2>

        <div className="tariffs">
          <div className="card">
            <h3>Beginner</h3>
            <p>Для старта</p>
            <button>Выбрать</button>
          </div>

          <div className="card">
            <h3>Pro</h3>
            <p>Для работы</p>
            <button>Выбрать</button>
          </div>

          <div className="card">
            <h3>Business</h3>
            <p>Для компаний</p>
            <button>Выбрать</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;