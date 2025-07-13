import api from './axios';
export const sendVisaExpiryAlerts = () => api.post('/communication/visa-expiry-alerts').then(r => r.data);
