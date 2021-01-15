import axios from 'axios';
import config from '../../config';

export const SynapsAPI = axios.create({
  baseURL: config.url.SYNAPS_API_URL,
});

export default axios.create({
  baseURL: config.url.API_URL,
});
