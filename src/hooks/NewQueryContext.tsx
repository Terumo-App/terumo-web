import { ReactNode, createContext, useState } from "react";

interface NewQueryData {
  collections?: Array<CollectionType>;
  imageType?: string;
  image?: {id:string};
  attributes?: Array<any>;
  returnedItems?:number;
  searchTime?:number;
}

interface ImageObject {
  thumbUrl?: string | ArrayBuffer;
  type?: string;
  name?: string;
}

interface CollectionType {
  key: string;
  id?: string;
  date: string;
  type: React.ReactElement | string;
  name: string;
  items: number | string;
  owner: string;
}

interface NewQueryProviderProps {
  children: ReactNode;
}

interface NewQueryContextData {
  newQueryData: NewQueryData;
  createNewQuery: () => void;
  setCollection: (collections: NewQueryData["collections"]) => void;
  setImageType: (imageType: NewQueryData["imageType"]) => void;
  setImageFile: (image: NewQueryData["image"]) => void;
  setSemanticAttributes: (attributes: NewQueryData["attributes"]) => void;
  setReturnedItems: (returnedItems: NewQueryData["returnedItems"]) => void;
  setSearchTime: (searchTime: NewQueryData["searchTime"]) => void;
  validateForm: (step: number) => boolean;
}

export const NewQueryContext = createContext<NewQueryContextData>(
  {} as NewQueryContextData
);

export function NewQueryProvider({ children }: NewQueryProviderProps) {
  const [newQueryData, setNewQueryData] = useState<NewQueryData>({});

  function createNewQuery(): void {
    console.log("====================================");
    console.log(newQueryData);
    console.log("====================================");
  }

  function setCollection(collections: NewQueryData["collections"]): void {
    setNewQueryData({ ...newQueryData, collections });
  }

  function setImageType(imageType: NewQueryData["imageType"]): void {
    setNewQueryData({ ...newQueryData, imageType });
  }

  function setImageFile(image: NewQueryData["image"]): void {
    setNewQueryData({ ...newQueryData, image });
  }

  function setSemanticAttributes(attributes: NewQueryData["attributes"]): void {
    setNewQueryData({ ...newQueryData, attributes });
  }

  function validateForm(step: number): boolean {
    if (!newQueryData.image && step === 0) {
      return false;
    }
    // if (!newQueryData.imageType && step === 1) {
    //   return false;
    // }
    if (!newQueryData.collections?.length && step === 1) {
      return false;
    }
    // if (!newQueryData.attributes?.length && step === 3) {
    //   return false;
    // }

    return true;
  }

  function setReturnedItems(returnedItems: NewQueryData["returnedItems"]): void {
    setNewQueryData({ ...newQueryData, returnedItems });
  }
  function setSearchTime(searchTime: NewQueryData["searchTime"]): void {
    console.log('search time: ', searchTime)
    setNewQueryData(newQueryData => ({
      ...newQueryData,
      searchTime: searchTime
    }));
    // setNewQueryData({ ...newQueryData, searchTime });

    console.log('newQueryData: ', newQueryData)
  }

  return (
    <NewQueryContext.Provider
      value={{
        newQueryData,
        createNewQuery,
        setCollection,
        setImageType,
        setImageFile,
        setSemanticAttributes,
        validateForm,
        setSearchTime,
        setReturnedItems,
      }}
    >
      {children}
    </NewQueryContext.Provider>
  );
}
