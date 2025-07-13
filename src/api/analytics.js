import api from './axios';
export const logEvent = (data) => api.post('/analytics', data).then(r => r.data);
export const fetchEvents = () => api.get('/analytics').then(r => r.data);
