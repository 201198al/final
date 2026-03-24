import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        borderBottom: "1px solid #eee",
      }}
    >
      <h1 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        SCAN
      </h1>

      {isAuth ? (
        <button onClick={logout}>Выйти</button>
      ) : (
        <button onClick={() => navigate("/login")}>Войти</button>
      )}
    </header>
  );
}

export default Header;