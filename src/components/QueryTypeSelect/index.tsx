import { Checkbox } from "antd";
import { Container } from "./styles";

import glomerulo from "../../assets/glomerulo.jpg";
import wsi from "../../assets/wsi.png";

import React, { useState, useContext } from "react";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { NewQueryContext } from "../../hooks/NewQueryContext";

const convertBlobToBase64 = (blob: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

function getBase64(file: File | Blob) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    console.log(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
}

async function getFileFromURL(imageUrl: string) {
  const response = await fetch(imageUrl, {
    method: "GET",
    headers: {},
  });

  const blob = await response.blob();
  const file = new File([blob], "testfile.png", { type: "image/png" });

  console.log(await blob.arrayBuffer());
  console.log(file);
  console.log(response.body);

  const base64String = getBase64(blob);
  console.log(base64String);
}

export function QueryTypeSelect() {
  const { setImageType, newQueryData } = useContext(NewQueryContext);

  const [value, setValue] = useState<string>();
  const [imgChecked, setImgChecked] = useState<boolean>(
    newQueryData.imageType === "img"
  );
  const [wsiChecked, setWsiChecked] = useState<boolean>(
    newQueryData.imageType === "wsi"
  );

  const onChange = async (e: CheckboxChangeEvent) => {
    await getFileFromURL(
      "https://fastly.picsum.photos/id/596/300/300.jpg?hmac=XyxyP0y5jQ2T0pgdg5EeUGKoxn5Y4rlNPj4lwbsvjPg"
    );
    setValue(e.target.id);
    if (e.target.id === "wsi") {
      setWsiChecked(true);
      setImgChecked(false);
    }

    if (e.target.id === "img") {
      setImgChecked(true);
      setWsiChecked(false);
    }

    setImageType(e.target.id);
  };

  return (
    <>
      <Container>
        <div>
          <Checkbox id="img" onChange={onChange} checked={imgChecked} />
        </div>

        <div>
          <img src={glomerulo}></img>
        </div>

        <div
          style={{
            minWidth: 150,
          }}
        >
          <h3>GLOMERULUS CROP</h3>
        </div>

        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </p>
        </div>
      </Container>

      <Container>
        <div>
          <Checkbox id="wsi" onChange={onChange} checked={wsiChecked} />
        </div>

        <div>
          <img src={wsi}></img>
        </div>

        <div
          style={{
            minWidth: 150,
          }}
        >
          <h3>WHOLE SLIDE IMAGE</h3>
        </div>

        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </p>
        </div>
      </Container>
    </>
  );
}
