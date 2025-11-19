import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('codeverse-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('codeverse-token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  signup: (name, email, password) => api.post('/auth/signup', { name, email, password }),
  getMe: () => api.get('/auth/me'),
};

export const runAPI = {
  execute: (language, code, input) => api.post('/run', { language, code, input }),
  getStatus: (runId) => api.get(`/run/${runId}`),
};

export const aiAPI = {
  explain: (code, language) => api.post('/ai/explain', { code, language }),
  fix: (code, language, error) => api.post('/ai/fix', { code, language, error }),
  optimize: (code, language) => api.post('/ai/optimize', { code, language }),
};

export const snippetsAPI = {
  getAll: () => api.get('/snippets'),
  save: (language, title, content) => api.post('/snippets', { language, title, content }),
  download: (id) => api.get(`/snippets/${id}/download`, { responseType: 'blob' }),
};

export const contactAPI = {
  submit: (name, email, message) => api.post('/contact', { name, email, message }),
};

export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: (params) => api.get('/admin/users', { params }),
  getSnippets: (params) => api.get('/admin/snippets', { params }),
  getExecutions: (params) => api.get('/admin/executions', { params }),
  getContacts: (params) => api.get('/admin/contacts', { params }),
  deleteUser: (userId) => api.delete(`/admin/users/${userId}`),
  deleteSnippet: (snippetId) => api.delete(`/admin/snippets/${snippetId}`),
  getStatistics: (params) => api.get('/admin/statistics', { params })
};


export default api;