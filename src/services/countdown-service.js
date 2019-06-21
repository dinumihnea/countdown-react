import axios from './axios'

const API_URL = '/countdown';

export const countdownService = {
  async getTarget () {
    const response = await axios.get(API_URL);
    if (response.data.status === 200 && response.data.countdownTarget) {
      return Promise.resolve(response.data.countdownTarget)
    } else {
      return Promise.resolve(response.data.status)
    }
  }
};
