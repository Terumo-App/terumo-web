import { pathoSpotterApi } from "./api";
import {
  mockCollectionsAvailableResult,
  mockCollectionsResult,
} from "./mockApiData";

export async function getCollectionsAvailableForQuery() {
  try {
    const collections = await pathoSpotterApi.get("/collections", {
      params: {
        private: false,
      },
    });
    console.log(collections.data);
    return collections.data;
  } catch (error: any) {
    return mockCollectionsAvailableResult();
  }
}

export async function getCollectionsQuery() {
  try {
    const collections = await pathoSpotterApi.get("/collections", {
      params: {
        private: false,
      },
    });
    console.log(collections.data);
    return collections.data;
  } catch (error: any) {
    return mockCollectionsResult();
  }
}
