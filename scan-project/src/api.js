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
  
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Ошибка запроса');
  }
  
  return response.json();
}


export const login = (login, password) => {
  return request('/account/login', {
    method: 'POST',
    body: JSON.stringify({ login, password }),
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
  localStorage.removeItem('userData');
};