import { useState, useRef, useEffect } from 'react';
import './Histogram.css';

function Histogram({ data, type, title }) {
  const [scrollIndex, setScrollIndex] = useState(0);
  const containerRef = useRef(null);
  
  if (!data || data.length === 0) return null;
  
  const maxValue = Math.max(...data.map(item => item.value), 1);
  
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
      setScrollIndex(prev => Math.max(0, prev - 1));
    }
  };
  
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
      setScrollIndex(prev => prev + 1);
    }
  };
  
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { month: 'short', year: 'numeric' });
  };
  
  return (
    <div className="histogram">
      <h3 className="histogram-title">{title}</h3>
      <div className="histogram-container">
        <button className="histogram-arrow left" onClick={scrollLeft}>
          ‹
        </button>
        <div className="histogram-bars" ref={containerRef}>
          {data.map((item, idx) => (
            <div key={idx} className="histogram-item">
              <div 
                className="histogram-bar"
                style={{ 
                  height: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: type === 'totalDocuments' ? '#029491' : '#ff6b6b'
                }}
              ></div>
              <span className="histogram-value">{item.value}</span>
              <span className="histogram-date">{formatDate(item.date)}</span>
            </div>
          ))}
        </div>
        <button className="histogram-arrow right" onClick={scrollRight}>
          ›
        </button>
      </div>
    </div>
  );
}

export default Histogram;