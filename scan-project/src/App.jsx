import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Search from './pages/Search/Search';
import Result from './pages/Result/Result';

function App() {
  const token = localStorage.getItem('accessToken');

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/search" 
          element={token ? <Search /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/result" 
          element={token ? <Result /> : <Navigate to="/login" />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;