import axios from 'axios';

const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api';

const api = axios.create({ baseURL: apiBase });

// Attach bearer token if present
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email, password) => api.post('/auth/login', { email, password });
export const refresh = (refreshToken) => api.post('/auth/refresh', { refreshToken });

export const fetchList = (path) => api.get(path).then((r) => r.data);
export const createItem = (path, payload) => api.post(path, payload).then((r) => r.data);
export const updateItem = (path, id, payload) => api.put(`${path}/${id}`, payload).then((r) => r.data);
export const deleteItem = (path, id) => api.delete(`${path}/${id}`);

export const getAbout = () => api.get('/about').then((r) => r.data);
export const saveAbout = (payload) => api.put('/about', payload).then((r) => r.data);

export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/upload/image', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data);
};

export const submitContact = (payload) => api.post('/contact', payload).then((r) => r.data);
export const fetchMessages = () => api.get('/contact').then((r) => r.data);

export default api;
