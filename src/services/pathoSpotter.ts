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


export async function addNewCollection(payload: any) {

  const collections = await pathoSpotterApi.post('/collection/create', payload, {
    params: {
      private: false,
    },
  });

  return collections.data;

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

export async function getImageList(payload: any, pageNumber: number) {

  const collections = await pathoSpotterApi.post(`/image/?page=${pageNumber}&size=9`, payload, {
    params: {
      private: false,
    },
  });

  return collections.data;

}
