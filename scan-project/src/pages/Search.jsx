import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Search() {
  const [inn, setInn] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/result");
  };

  return (
    <div>
      <h2>Поиск компании</h2>

      <input
        type="text"
        placeholder="Введите ИНН"
        value={inn}
        onChange={(e) => setInn(e.target.value)}
      />

      <br />

      <button onClick={handleSearch}>Искать</button>
    </div>
  );
}

export default Search;