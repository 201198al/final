import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const inn = location.state?.inn;

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const fakeData = [
        { id: 1, title: "Компания растет", text: "Доход увеличился на 20%" },
        { id: 2, title: "Новая сделка", text: "Подписан крупный контракт" },
        { id: 3, title: "Расширение", text: "Открытие нового офиса" },
      ];

      setNews(fakeData);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="container">
      <h2>Результаты поиска</h2>

      <button onClick={() => navigate("/search")}>
        Назад
      </button>

      <p>Вы искали ИНН: {inn}</p>

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div className="news">
          {news.map((item) => (
            <div key={item.id} className="news-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Result;