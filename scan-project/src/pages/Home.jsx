<header>
  <h1>SCAN</h1>

  {localStorage.getItem("token") ? (
    <button
      onClick={() => {
        localStorage.removeItem("token");
        window.location.reload();
      }}
    >
      Выйти
    </button>
  ) : (
    <button onClick={() => navigate("/login")}>Войти</button>
  )}
</header>