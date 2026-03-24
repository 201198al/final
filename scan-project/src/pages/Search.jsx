import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [inn, setInn] = useState("");
  const [limit, setLimit] = useState(10);
  const [error, setError] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const handleSearch = () => {
    if (inn.length !== 10 && inn.length !== 12) {
      setError("Введите корректный ИНН");
      return;
    }

    localStorage.setItem("searchData", JSON.stringify({ inn, limit }));

    navigate("/result");
  };

  return (
    <div className="container">
      <h2>Найдите необходимые данные</h2>

      <div className="card">
        <input
          placeholder="ИНН компании"
          value={inn}
          onChange={(e) => setInn(e.target.value)}
        />

        <input
          type="number"
          placeholder="Количество документов"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />

        <label>
          <input
            type="checkbox"
            checked={checkbox}
            onChange={() => setCheckbox(!checkbox)}
          />
          Только позитивные новости
        </label>

        <br /><br />

        <button onClick={handleSearch}>Поиск</button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default Search;