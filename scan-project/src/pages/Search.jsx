import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [inn, setInn] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [limit, setLimit] = useState(10);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  const handleSearch = () => {
    if (inn.length !== 10 && inn.length !== 12) {
      setError("ИНН должен быть 10 или 12 цифр");
      return;
    }

    if (!dateFrom || !dateTo) {
      setError("Выберите даты");
      return;
    }

    if (new Date(dateFrom) > new Date(dateTo)) {
      setError("Дата начала больше даты конца");
      return;
    }

    if (new Date(dateTo) > new Date()) {
      setError("Дата не может быть в будущем");
      return;
    }

    if (limit < 1 || limit > 1000) {
      setError("Количество от 1 до 1000");
      return;
    }

    setError("");

    localStorage.setItem(
      "searchData",
      JSON.stringify({
        inn,
        dateFrom,
        dateTo,
        limit,
      })
    );

    navigate("/result");
  };

  return (
    <div className="container">
      <h2>Поиск компании</h2>

      <input
        type="text"
        placeholder="Введите ИНН"
        value={inn}
        onChange={(e) => {
          setInn(e.target.value);
          setError("");
        }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="date"
        value={dateFrom}
        onChange={(e) => setDateFrom(e.target.value)}
      />

      <input
        type="date"
        value={dateTo}
        onChange={(e) => setDateTo(e.target.value)}
      />

      <input
        type="number"
        placeholder="Количество документов"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
      />

      <select>
        <option>Любая</option>
        <option>Позитивная</option>
        <option>Негативная</option>
      </select>

      <button onClick={handleSearch}>Поиск</button>
    </div>
  );
}

export default Search;