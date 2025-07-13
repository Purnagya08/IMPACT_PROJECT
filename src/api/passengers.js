import api from './axios';

export const fetchPassengers = () => api.get('/passengers').then(r => r.data);
export const fetchPassenger = (id) => api.get(`/passengers/${id}`).then(r => r.data);
export const addPassenger = (data) => api.post('/passengers', data).then(r => r.data);
export const flagPassenger = (id) => api.patch(`/passengers/${id}/flag`).then(r => r.data);
