import { pathoSpotterApi } from './api';
import {
  mockCollectionsAvailableResult,
  mockCollectionsResult,
} from './mockApiData';
import axios from "axios";


function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${month}-${day}-${year}`;
}


export async function queryApi() {
  const res = await axios.post(`http://localhost:8000/v1/collection`,
    {
      "primary_key": "142d946a-836b-48b9-8b9e-9e0b568c49ec",
      "public_key": "d23221f6-2181-4d91-8b59-7437d46bc38b"
    }
  );

  return res
}


export async function getCollectionsAvailableForQuery() {
  try {
    const collections = await pathoSpotterApi.get('/collection', {
      params: {
        private: false,
      },
    });

    return collections.data;
  } catch (error: any) {
    return mockCollectionsAvailableResult();
  }
}

export async function getCollectionsQuery(data: any) {
  try {
    const collections = await pathoSpotterApi.post('/collection', data, {
      params: {
        private: false,
      },
    });

    return collections.data;
  } catch (error: any) {
    return mockCollectionsResult();
  }
}
