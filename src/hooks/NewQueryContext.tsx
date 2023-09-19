import { ReactNode, createContext, useState } from "react";

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
  validateForm: (step: number) => boolean;
}

export const NewQueryContext = createContext<NewQueryContextData>(
  {} as NewQueryContextData
);

export function NewQueryProvider({ children }: NewQueryProviderProps) {
  const [newQueryData, setNewQueryData] = useState<NewQueryData>({});

  function createNewQuery(): void {
    console.log(newQueryData);
    // setNewQueryData({});
  }

  function setCollection(collections: NewQueryData["collections"]): void {
    console.log(collections);
    setNewQueryData({ ...newQueryData, collections });
  }

  function setImageType(imageType: NewQueryData["imageType"]): void {
    console.log(imageType);
    setNewQueryData({ ...newQueryData, imageType });
  }

  function setImageFile(image: NewQueryData["image"]): void {
    console.log(image);
    setNewQueryData({ ...newQueryData, image });
  }

  function setSemanticAttributes(attributes: NewQueryData["attributes"]): void {
    console.log(attributes);
    setNewQueryData({ ...newQueryData, attributes });
  }

  function validateForm(step: number): boolean {
    if (!newQueryData.collections?.length && step === 0) {
      return false;
    }
    if (!newQueryData.imageType && step === 1) {
      return false;
    }
    if (!newQueryData.image && step === 2) {
      return false;
    }
    if (!newQueryData.attributes?.length && step === 3) {
      return false;
    }

    return true;
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
      }}
    >
      {children}
    </NewQueryContext.Provider>
  );
}
