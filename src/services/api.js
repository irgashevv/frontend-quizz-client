import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://service-quizz.tj/api',
  'Content-Type': 'application/json',
  Accept: 'application/json',
});

export const getTopics = () => api.get('/client');
export const getTopic = topicId => api.get(`/client/${topicId}`);
export const submitTopic = (topicId, params) => api.post(`/client/${topicId}`, params);
export const signUp = params => api.post('/register', params);
export const signIn = params => api.post('/login', params);
