import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://service-quizz.tj/api/client',
  'Content-Type': 'application/json',
  Accept: 'application/json',
});

export const getTopics = () => api.get('');
export const getTopic = topicId => api.get(`/${topicId}`);
export const submitTopic = (topicId, params) => api.post(`/${topicId}`, params);
