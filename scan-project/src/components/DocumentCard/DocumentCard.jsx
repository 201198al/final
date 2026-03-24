import './DocumentCard.css';

function DocumentCard({ document }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  const getTags = (attributes) => {
    const tags = [];
    if (attributes.isTechNews) tags.push({ type: 'tech', text: 'Техническая новость' });
    if (attributes.isAnnouncement) tags.push({ type: 'announcement', text: 'Анонс' });
    if (attributes.isDigest) tags.push({ type: 'digest', text: 'Сводка' });
    return tags;
  };
  
  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };
  
  const extractText = (content) => {
    if (!content || !content.markup) return '';
    const text = stripHtml(content.markup);
    return text.length > 300 ? text.substring(0, 300) + '...' : text;
  };
  
  const tags = getTags(document.attributes);
  
  return (
    <article className="document-card">
      <div className="card-header">
        <span className="card-date">{formatDate(document.issueDate)}</span>
        <a 
          href={document.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="card-source"
        >
          {document.source?.name || 'Источник'}
        </a>
      </div>
      
      <h3 className="card-title">{document.title?.text || 'Без заголовка'}</h3>
      
      {tags.length > 0 && (
        <div className="card-tags">
          {tags.map((tag, idx) => (
            <span key={idx} className={`tag tag-${tag.type}`}>
              {tag.text}
            </span>
          ))}
        </div>
      )}
      
      <div className="card-content">
        {extractText(document.content)}
      </div>
      
      <div className="card-footer">
        <a 
          href={document.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="read-more"
        >
          Читать в источнике
        </a>
        <span className="word-count">
          {document.attributes?.wordCount || 0} слов
        </span>
      </div>
    </article>
  );
}

export default DocumentCard;