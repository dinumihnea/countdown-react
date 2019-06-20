import axios from 'axios'

const API_PREFIX = 'api';
const API_VERSION = 'v1';
axios.defaults.baseURL = `http://localhost:8080/${API_PREFIX}/${API_VERSION}`;

export default axios
