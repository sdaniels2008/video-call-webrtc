import axios from 'axios'

const HTTPService = axios.create({
  baseURL: 'http://localhost:4500',
});

export default HTTPService;
