import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Result() {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("searchData"));
  const [visible, setVisible] = useState(3);

  const news = [
    {
      id: 1,
      title: "Компания показала рост",
      text: "За последний квартал показатели выросли.",
      date: "12.03.2024",
      source: "РБК",
    },
    {
      id: 2,
      title: "Новый продукт",
      text: "Компания представила новый сервис.",
      date: "10.03.2024",
      source: "ТАСС",
    },
    {
      id: 3,
      title: "Партнерство",
      text: "Заключено соглашение с партнёрами.",
      date: "08.03.2024",
      source: "Интерфакс",
    },
    {
      id: 4,
      title: "Рост акций",
      text: "Акции выросли на 5%",
      date: "05.03.2024",
      source: "Ведомости",
    },
  ];

  return (
    <div className="container">
      <button onClick={() => navigate("/search")}>Назад</button>

      <h2>Результаты поиска</h2>
      <p className="small">ИНН: {data?.inn}</p>

      {news.slice(0, visible).map((item) => (
        <div key={item.id} className="card">
          <p className="small">
            {item.date} | {item.source}
          </p>

          <h3>{item.title}</h3>

          <p>{item.text}</p>

          <button>Читать</button>
        </div>
      ))}

      {visible < news.length && (
        <button onClick={() => setVisible(visible + 3)}>
          Показать ещё
        </button>
      )}
    </div>
  );
}

export default Result;