export function sleep(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

export const convertBlobToBase64 = (blob: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

export function getBase64(file: File | Blob) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    //console.log(reader.result);
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}

export async function getFileFromURL(imageUrl: string) {
  const response = await fetch(imageUrl, {
    method: 'GET',
    headers: {},
  });

  const blob = await response.blob();
  const file = new File([blob], 'testfile.png', {
    type: 'image/png',
  });

  // console.log(await blob.arrayBuffer());
  // console.log(file);

  const base64String = getBase64(blob);
  // console.log(base64String);

  return {
    file,
    base64: base64String,
  };
}

export function getRandomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
