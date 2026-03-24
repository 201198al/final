import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Result() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalData, setTotalData] = useState([]);
  const [riskData, setRiskData] = useState([]);
  const [allDocuments, setAllDocuments] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  
  const allTestDocuments = [
    { id: 1, date: "15 марта 2024", source: "Коммерсантъ", sourceUrl: "https://www.kommersant.ru", title: "Компания запустила новый продукт на рынке", text: "Сегодня компания представила инновационное решение. Продукт уже доступен для клиентов. Эксперты высоко оценивают потенциал развития.", tags: [{ text: "Анонс", type: "announcement" }], words: 145 },
    { id: 2, date: "14 марта 2024", source: "РБК", sourceUrl: "https://www.rbc.ru", title: "Финансовые результаты превзошли ожидания аналитиков", text: "Выручка выросла на 35% по сравнению с прошлым годом. Чистая прибыль увеличилась в два раза. Компания планирует расширение.", tags: [], words: 178 },
    { id: 3, date: "13 марта 2024", source: "Ведомости", sourceUrl: "https://www.vedomosti.ru", title: "Техническая новость: внедрение новой IT-платформы", text: "Компания завершила миграцию на новую IT-инфраструктуру. Проект реализован с опережением графика. Ожидается повышение эффективности.", tags: [{ text: "Техническая новость", type: "tech" }], words: 312 },
    { id: 4, date: "12 марта 2024", source: "Интерфакс", sourceUrl: "https://www.interfax.ru", title: "Сводка новостей: главные события недели", text: "Главные события недели в мире бизнеса: запуск новых продуктов, назначения топ-менеджеров, открытие региональных офисов.", tags: [{ text: "Сводка", type: "digest" }], words: 334 },
    { id: 5, date: "11 марта 2024", source: "Forbes", sourceUrl: "https://www.forbes.ru", title: "Компания вошла в топ-10 лучших работодателей", text: "Рейтинг лучших работодателей составлен на основе опроса сотрудников. Компания отмечена за высокий уровень зарплат и соцпакет.", tags: [], words: 98 },
    { id: 6, date: "10 марта 2024", source: "ТАСС", sourceUrl: "https://www.tass.ru", title: "Анонс: презентация годового отчета состоится 25 марта", text: "Компания приглашает инвесторов и аналитиков на презентацию годового отчета. Мероприятие пройдет в онлайн-формате.", tags: [{ text: "Анонс", type: "announcement" }], words: 67 },
    { id: 7, date: "9 марта 2024", source: "Коммерсантъ", sourceUrl: "https://www.kommersant.ru", title: "Компания получила престижную отраслевую награду", text: "Компания стала лауреатом премии 'Лучший работодатель года'. Награда вручается за вклад в развитие кадрового потенциала.", tags: [], words: 156 },
    { id: 8, date: "8 марта 2024", source: "РБК", sourceUrl: "https://www.rbc.ru", title: "Аналитика: рынок ожидает роста в 2024 году", text: "Эксперты прогнозируют рост рынка на 15-20% в текущем году. Компания находится в выигрышной позиции благодаря диверсификации.", tags: [], words: 203 }
  ];
  
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
      return;
    }
    setTotalData([{ date: "Янв", value: 150 }, { date: "Фев", value: 230 }, { date: "Мар", value: 180 }, { date: "Апр", value: 290 }, { date: "Май", value: 210 }]);
    setRiskData([{ date: "Янв", value: 12 }, { date: "Фев", value: 25 }, { date: "Мар", value: 18 }, { date: "Апр", value: 32 }, { date: "Май", value: 15 }]);
    setAllDocuments(allTestDocuments.slice(0, 3));
    setVisibleCount(3);
    setLoading(false);
  }, [navigate]);
  
  const loadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      const newCount = Math.min(visibleCount + 3, allTestDocuments.length);
      setAllDocuments(allTestDocuments.slice(0, newCount));
      setVisibleCount(newCount);
      setLoadingMore(false);
    }, 500);
  };
  
  const hasMore = visibleCount < allTestDocuments.length;
  
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #f3f3f3', borderTop: '3px solid #029491', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ marginLeft: '10px' }}>Загрузка...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }
  
  const maxTotal = Math.max(...totalData.map(d => d.value), 1);
  const maxRisk = Math.max(...riskData.map(d => d.value), 1);
  
  const getTagStyle = (type) => {
    switch(type) {
      case 'tech': return { background: '#e3f2fd', color: '#1976d2' };
      case 'announcement': return { background: '#fff3e0', color: '#f57c00' };
      case 'digest': return { background: '#e8f5e9', color: '#388e3c' };
      default: return { background: '#f0f0f0', color: '#666' };
    }
  };
  
  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '30px' }}>Результаты поиска</h1>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, background: '#fff', padding: '20px', borderRadius: '12px' }}>
          <h3>Всего публикаций</h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', height: '150px', marginTop: '20px' }}>
            {totalData.map((item, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ height: `${(item.value / maxTotal) * 120}px`, background: '#029491', borderRadius: '4px' }}></div>
                <div style={{ fontSize: '12px', marginTop: '5px' }}>{item.value}</div>
                <div style={{ fontSize: '11px', color: '#999' }}>{item.date}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, background: '#fff', padding: '20px', borderRadius: '12px' }}>
          <h3>Риск-факторы</h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', height: '150px', marginTop: '20px' }}>
            {riskData.map((item, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ height: `${(item.value / maxRisk) * 120}px`, background: '#ff6b6b', borderRadius: '4px' }}></div>
                <div style={{ fontSize: '12px', marginTop: '5px' }}>{item.value}</div>
                <div style={{ fontSize: '11px', color: '#999' }}>{item.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div style={{ background: '#fff', borderRadius: '16px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2>Список документов</h2>
          <span>Найдено: {allTestDocuments.length}</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {allDocuments.map(doc => (
            <div key={doc.id} style={{ border: '1px solid #e0e0e0', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '12px', color: '#999' }}>
                <span>{doc.date}</span>
                <a href={doc.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#029491', textDecoration: 'none' }}>{doc.source}</a>
              </div>
              <h3 style={{ marginBottom: '12px', fontSize: '18px' }}>{doc.title}</h3>
              {doc.tags.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                  {doc.tags.map((tag, idx) => (
                    <span key={idx} style={{ ...getTagStyle(tag.type), padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '500' }}>{tag.text}</span>
                  ))}
                </div>
              )}
              <p style={{ color: '#555', marginBottom: '16px', lineHeight: '1.5' }}>{doc.text}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f0f0f0', paddingTop: '12px' }}>
                <a href={doc.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#029491', textDecoration: 'none' }}>Читать в источнике →</a>
                <span style={{ fontSize: '12px', color: '#999' }}>{doc.words} слов</span>
              </div>
            </div>
          ))}
        </div>
        
        {hasMore && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
            <button onClick={loadMore} disabled={loadingMore} style={{ background: '#fff', border: '1px solid #029491', color: '#029491', padding: '12px 32px', borderRadius: '8px', fontSize: '14px', cursor: loadingMore ? 'default' : 'pointer', opacity: loadingMore ? 0.6 : 1 }}>
              {loadingMore ? 'Загрузка...' : 'Показать больше'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Result;