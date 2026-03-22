import { useState } from "react";

function Result() {
  const data = JSON.parse(localStorage.getItem("searchData"));

  const [visible, setVisible] = useState(3);

  const news = [
    { id: 1, title: "Новость 1", text: "Описание новости 1" },
    { id: 2, title: "Новость 2", text: "Описание новости 2" },
    { id: 3, title: "Новость 3", text: "Описание новости 3" },
    { id: 4, title: "Новость 4", text: "Описание новости 4" },
    { id: 5, title: "Новость 5", text: "Описание новости 5" },
    { id: 6, title: "Новость 6", text: "Описание новости 6" },
  ];

  return (
    <div className="container">
      <h2>Результаты для ИНН: {data?.inn}</h2>

      {news.slice(0, visible).map((item) => (
        <div key={item.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
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