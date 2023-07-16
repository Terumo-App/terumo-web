import { Checkbox } from 'antd';
import { Container } from './styles';

import React, { useState, useContext, useEffect } from 'react';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { NewQueryContext } from '../../hooks/NewQueryContext';
import ApiClient from '../../services/api';


export function AttributeSelect() {
  const { setSemanticAttributes } = useContext(NewQueryContext);

  const [attributes, setAttributes] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);

  const api = new ApiClient()

  const fetchAvailableCollections = async () => {
      const response = await api.getAvailableCollections();
      setData(response); 
  };

  useEffect(() => {
    fetchAvailableCollections();
  }, []);

  const onChange = (e: CheckboxChangeEvent) => {
    if (
      e.target.checked &&
      e.target.id &&
      !attributes.includes(e.target.id)
    ) {
      setAttributes([...attributes, e.target.id]);
      setSemanticAttributes([...attributes, e.target.id]);
    } else {
      setAttributes(
        attributes.filter((value) => value !== e.target.id)
      );
      setSemanticAttributes(attributes.filter((value) => value !== e.target.id));
    }
  };

  return (
    <>
      {data.map((item) => (
        <Container key={item.id}>
          <div >
            <Checkbox id={item.id} onChange={onChange} />
            <div>
              <h4>{item.name}</h4>
            </div>
          </div>
        </Container>
      ))}
    </>
  );
}
