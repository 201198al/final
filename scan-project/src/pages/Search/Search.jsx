import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
  const navigate = useNavigate();
  
  const [inn, setInn] = useState('');
  const [tonality, setTonality] = useState('any');
  const [limit, setLimit] = useState(10);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const [maxFullness, setMaxFullness] = useState(true);
  const [inBusinessNews, setInBusinessNews] = useState(true);
  const [onlyMainRole, setOnlyMainRole] = useState(true);
  const [onlyWithRiskFactors, setOnlyWithRiskFactors] = useState(false);
  const [excludeTechNews, setExcludeTechNews] = useState(false);
  const [excludeAnnouncements, setExcludeAnnouncements] = useState(false);
  const [excludeDigests, setExcludeDigests] = useState(false);
  
  const [innError, setInnError] = useState('');
  const [dateError, setDateError] = useState('');
  const [limitError, setLimitError] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);
  
  useEffect(() => {
    if (inn === '') {
      setInnError('');
      return;
    }
    if (inn.length !== 10 && inn.length !== 12) {
      setInnError('ИНН должен быть 10 или 12 цифр');
    } else if (isNaN(Number(inn))) {
      setInnError('ИНН должен содержать только цифры');
    } else {
      setInnError('');
    }
  }, [inn]);
  
  useEffect(() => {
    if (!startDate || !endDate) {
      setDateError('');
      return;
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();
    if (start > now) {
      setDateError('Дата начала не может быть в будущем');
    } else if (end > now) {
      setDateError('Дата окончания не может быть в будущем');
    } else if (start > end) {
      setDateError('Дата начала не может быть позже даты окончания');
    } else {
      setDateError('');
    }
  }, [startDate, endDate]);
  
  useEffect(() => {
    if (limit === '') {
      setLimitError('');
      return;
    }
    const num = Number(limit);
    if (num < 1) {
      setLimitError('Не менее 1');
    } else if (num > 1000) {
      setLimitError('Не более 1000');
    } else {
      setLimitError('');
    }
  }, [limit]);
  
  const isValid = () => {
    if (!inn) return false;
    if (innError) return false;
    if (!startDate) return false;
    if (!endDate) return false;
    if (dateError) return false;
    if (!limit) return false;
    if (limitError) return false;
    return true;
  };
  
  const handleSearch = () => {
    if (!isValid()) return;
    setLoading(true);
    
    setTimeout(() => {
      const testData = {
        data: [
          {
            histogramType: "totalDocuments",
            data: [
              { date: "2024-01-01", value: 150 },
              { date: "2024-02-01", value: 230 },
              { date: "2024-03-01", value: 180 },
              { date: "2024-04-01", value: 290 },
              { date: "2024-05-01", value: 210 }
            ]
          },
          {
            histogramType: "riskFactors",
            data: [
              { date: "2024-01-01", value: 12 },
              { date: "2024-02-01", value: 25 },
              { date: "2024-03-01", value: 18 },
              { date: "2024-04-01", value: 32 },
              { date: "2024-05-01", value: 15 }
            ]
          }
        ]
      };
      
      localStorage.setItem('histogramData', JSON.stringify(testData));
      setLoading(false);
      navigate('/result');
    }, 500);
  };
  
  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '30px' }}>Найдите необходимые данные</h1>
      
      <div style={{ background: '#fff', padding: '32px', borderRadius: '16px' }}>
        <div style={{ marginBottom: '24px' }}>
          <label>ИНН компании *</label>
          <input
            type="text"
            value={inn}
            onChange={(e) => setInn(e.target.value)}
            style={{ width: '100%', padding: '12px', marginTop: '8px', border: '1px solid #e0e0e0', borderRadius: '8px' }}
          />
          {innError && <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{innError}</div>}
        </div>
        
        <div style={{ marginBottom: '24px' }}>
          <label>Тональность *</label>
          <select value={tonality} onChange={(e) => setTonality(e.target.value)} style={{ width: '100%', padding: '12px', marginTop: '8px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <option value="any">Любая</option>
            <option value="positive">Позитивная</option>
            <option value="negative">Негативная</option>
          </select>
        </div>
        
        <div style={{ marginBottom: '24px' }}>
          <label>Количество документов *</label>
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            style={{ width: '100%', padding: '12px', marginTop: '8px', border: '1px solid #e0e0e0', borderRadius: '8px' }}
          />
          {limitError && <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{limitError}</div>}
        </div>
        
        <div style={{ marginBottom: '24px' }}>
          <label>Диапазон дат *</label>
          <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ flex: 1, padding: '12px', border: '1px solid #e0e0e0', borderRadius: '8px' }} />
            <span>—</span>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ flex: 1, padding: '12px', border: '1px solid #e0e0e0', borderRadius: '8px' }} />
          </div>
          {dateError && <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{dateError}</div>}
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            <input type="checkbox" checked={maxFullness} onChange={() => setMaxFullness(!maxFullness)} />
            <span style={{ marginLeft: '8px' }}>Признак максимальной полноты</span>
          </label>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            <input type="checkbox" checked={inBusinessNews} onChange={() => setInBusinessNews(!inBusinessNews)} />
            <span style={{ marginLeft: '8px' }}>Упоминания в бизнес-контексте</span>
          </label>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            <input type="checkbox" checked={onlyMainRole} onChange={() => setOnlyMainRole(!onlyMainRole)} />
            <span style={{ marginLeft: '8px' }}>Главная роль в публикации</span>
          </label>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            <input type="checkbox" checked={onlyWithRiskFactors} onChange={() => setOnlyWithRiskFactors(!onlyWithRiskFactors)} />
            <span style={{ marginLeft: '8px' }}>Публикации только с риск-факторами</span>
          </label>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            <input type="checkbox" checked={excludeTechNews} onChange={() => setExcludeTechNews(!excludeTechNews)} />
            <span style={{ marginLeft: '8px' }}>Включать технические новости</span>
          </label>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            <input type="checkbox" checked={excludeAnnouncements} onChange={() => setExcludeAnnouncements(!excludeAnnouncements)} />
            <span style={{ marginLeft: '8px' }}>Включать анонсы</span>
          </label>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            <input type="checkbox" checked={excludeDigests} onChange={() => setExcludeDigests(!excludeDigests)} />
            <span style={{ marginLeft: '8px' }}>Включать сводки</span>
          </label>
        </div>
        
        <button
          onClick={handleSearch}
          disabled={!isValid() || loading}
          style={{
            marginTop: '30px',
            width: '100%',
            padding: '14px',
            background: isValid() ? '#029491' : '#ccc',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: isValid() ? 'pointer' : 'default'
          }}
        >
          {loading ? 'Загрузка...' : 'Поиск'}
        </button>
      </div>
    </div>
  );
}

export default Search;
