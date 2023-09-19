import { Checkbox } from "antd";
import { Container } from "./styles";

import React, { useState, useContext, useEffect } from "react";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { NewQueryContext } from "../../hooks/NewQueryContext";
import { pathoSpotterApi } from "../../services/api";

export function AttributeSelect() {
  const { setSemanticAttributes } = useContext(NewQueryContext);

  const [attributes, setAttributes] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);

  const fetchAvailableCollections = async () => {
    try {
      const response = await pathoSpotterApi.get(
        "/search-service/semantic-attributes"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error on request GET:", error);
      setData(["Attribute 1", "Attribute 2", "Attribute 3", "Attribute 4"]);
    }
  };

  useEffect(() => {
    fetchAvailableCollections();
  }, []);

  const onChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked && e.target.id && !attributes.includes(e.target.id)) {
      setAttributes([...attributes, e.target.id]);
      setSemanticAttributes([...attributes, e.target.id]);
    } else {
      setAttributes(attributes.filter((value) => value !== e.target.id));
      setSemanticAttributes(
        attributes.filter((value) => value !== e.target.id)
      );
    }
  };

  return (
    <>
      {data.map((item, index) => (
        <Container key={index}>
          <div>
            <Checkbox id={`${index}`} onChange={onChange} />
            <div>
              <h4>{item}</h4>
            </div>
          </div>
        </Container>
      ))}
    </>
  );
}
