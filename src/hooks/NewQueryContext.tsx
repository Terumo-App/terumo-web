import { ReactNode, createContext, useState } from 'react';

interface NewQueryData {
  collections?: Array<any>;
  imageType?: string;
  image?: ImageObject;
  attributes?: Array<any>;
}

interface ImageObject {
  thumbUrl?: string | ArrayBuffer;
  type?: string;
  name?: string;
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
}

export const NewQueryContext = createContext<NewQueryContextData>({} as NewQueryContextData);

export function NewQueryProvider({
  children,
}: NewQueryProviderProps) {
  const [newQueryData, setNewQueryData] = useState<NewQueryData>({});

  function createNewQuery(): void {
    console.log(newQueryData);
    setNewQueryData({});
  }

  function setCollection(collections: NewQueryData["collections"]): void {
    console.log(collections);
    setNewQueryData({ ...newQueryData, collections })
  }

  function setImageType(imageType: NewQueryData["imageType"]): void {
    console.log(imageType);
    setNewQueryData({ ...newQueryData, imageType })
  }

  function setImageFile(image: NewQueryData["image"]): void {
    console.log(image);
    setNewQueryData({ ...newQueryData, image })
  }

  function setSemanticAttributes(attributes: NewQueryData["attributes"]): void {
    console.log(attributes);
    setNewQueryData({ ...newQueryData, attributes })
  }

  return (
    <NewQueryContext.Provider value={{ newQueryData, createNewQuery, setCollection, setImageType, setImageFile, setSemanticAttributes }}>
      {children}
    </NewQueryContext.Provider>
  );
}

