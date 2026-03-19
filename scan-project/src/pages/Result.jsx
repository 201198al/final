import { useLocation } from "react-router-dom";

function Result() {
  const location = useLocation();
  const inn = location.state?.inn;

  return (
    <div>
      <h2>Результаты поиска</h2>

      <p>Вы искали ИНН: {inn}</p>

      <div>
        <p>Новость 1 про компанию</p>
        <p>Новость 2 про компанию</p>
        <p>Новость 3 про компанию</p>
      </div>
    </div>
  );
}

export default Result;