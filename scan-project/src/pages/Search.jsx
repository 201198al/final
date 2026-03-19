import { useState } from "react";

function Search() {
  const [inn, setInn] = useState("");

  const handleSearch = () => {
    alert("Ищем по ИНН: " + inn);
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

      <button onClick={handleSearch}>Поиск</button>
    </div>
  );
}

export default Search;