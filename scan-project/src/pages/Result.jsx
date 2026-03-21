import { useLocation } from "react-router-dom";

function Result() {
  const location = useLocation();
  const inn = location.state?.inn;

  // ФЕЙКОВЫЕ ДАННЫЕ (как будто с API)
  const news = [
    { id: 1, title: "Компания растет", text: "Доход увеличился на 20%" },
    { id: 2, title: "Новая сделка", text: "Подписан крупный контракт" },
    { id: 3, title: "Расширение", text: "Открытие нового офиса" },
  ];

  return (
    <div>
      <h2>Результаты поиска</h2>

      <p>Вы искали ИНН: {inn}</p>

      <div className="news">
        {news.map((item) => (
          <div key={item.id} className="news-card">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Result;