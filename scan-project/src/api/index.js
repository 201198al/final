const BASE_URL = 'https://gateway.scan-interfax.ru/api/v1';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('accessToken');
  
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers,
  };
  
  if (token && !endpoint.includes('/login')) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('expire');
        window.location.href = '/login';
        throw new Error('Сессия истекла, войдите снова');
      }
      const errorText = await response.text();
      throw new Error(errorText || 'Ошибка запроса');
    }
    
    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export const login = (loginValue, password) => {
  return request('/account/login', {
    method: 'POST',
    body: JSON.stringify({ login: loginValue, password }),
  });
};

export const getAccountInfo = () => {
  return request('/account/info');
};

export const searchHistograms = (params) => {
  return request('/objectsearch/histograms', {
    method: 'POST',
    body: JSON.stringify(params),
  });
};

export const searchObjects = (params) => {
  return request('/objectsearch', {
    method: 'POST',
    body: JSON.stringify(params),
  });
};

export const getDocuments = (ids) => {
  if (!ids || ids.length === 0) return Promise.resolve([]);
  return request('/documents', {
    method: 'POST',
    body: JSON.stringify({ ids }),
  });
};

export const checkToken = () => {
  const token = localStorage.getItem('accessToken');
  const expire = localStorage.getItem('expire');
  
  if (!token || !expire) return false;
  
  const expireDate = new Date(expire);
  const now = new Date();
  
  return expireDate > now;
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('expire');
  localStorage.removeItem('searchParams');
  localStorage.removeItem('histogramData');
  localStorage.removeItem('objectIds');
  localStorage.removeItem('searchInn');
};