import axios, { AxiosInstance } from 'axios';

// const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
const BASE_API_URL = 'http://localhost:5000';


export const Api = axios.create({
  baseURL: 'http://localhost:5000',
});


export default class ApiClient {
  api: AxiosInstance;
  constructor() {
    this.api = axios.create({ baseURL: BASE_API_URL, })
  }

  async storeImageQuery(body: Object) {
    try {
      const response = await this.api.post('/search-service/upload-query-image', body);
      return response.data
    } catch (error) {
      console.error('Error on request GET:', error);
    }
  }

  async executeQuery(body: Object) {
    try {
      const response = await this.api.post('/search-service/search', body);
      return response.data
    } catch (error) {
      console.error('Error on request GET:', error);
    }
  }

  async getAvailableCollections() {
    try {
      const response = await this.api.get('/search-service/semantic-attributes');
      return response.data
    } catch (error) {
      console.error('Error on request GET:', error);
    }
  }

}

