import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [inn, setInn] = useState("");
  const navigate = useNavigate();

 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

 const handleSearch = () => {
  localStorage.setItem("inn", inn);
  navigate("/result");
};

  return (
    <div className="container">
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