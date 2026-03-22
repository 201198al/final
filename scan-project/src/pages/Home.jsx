import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>SCAN</h1>

        {localStorage.getItem("token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            Выйти
          </button>
        ) : (
          <button onClick={() => navigate("/login")}>Войти</button>
        )}
      </header>

      <h2>Сервис по поиску публикаций</h2>
      <p>Анализируем новости и данные</p>

      <button onClick={() => navigate("/search")}>
        Начать поиск
      </button>

      <h2 style={{ marginTop: "40px" }}>Наши тарифы</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ border: "1px solid #ccc", padding: "20px" }}>
          <h3>Beginner</h3>
          <p>Для старта</p>
          <button>Выбрать</button>
        </div>

        <div style={{ border: "1px solid #ccc", padding: "20px" }}>
          <h3>Pro</h3>
          <p>Для работы</p>
          <button>Выбрать</button>
        </div>

        <div style={{ border: "1px solid #ccc", padding: "20px" }}>
          <h3>Business</h3>
          <p>Для компаний</p>
          <button>Выбрать</button>
        </div>
      </div>
    </div>
  );
}

export default Home;