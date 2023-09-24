import { Checkbox } from 'antd';
import { Container } from './styles';

import React, { useState, useContext, useEffect } from 'react';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { NewQueryContext } from '../../hooks/NewQueryContext';
import { pathoSpotterApi } from '../../services/api';
import { LoadingSearchStep } from '../Steps/LoadingSearch';

const semantic_attributes = [
  {
    id: 'normal',
    name: 'Normal',
  },
  {
    id: 'hypercellularity',
    name: 'Hypercellularity',
  },
  {
    id: 'podocytopathy',
    name: 'Podocytopathy',
  },
  {
    id: 'membranous',
    name: 'Membranous',
  },
  {
    id: 'crescent',
    name: 'Crescent',
  },
  {
    id: 'sclerosis',
    name: 'Sclerosis',
  },
];

export function AttributeSelect() {
  const { setSemanticAttributes } = useContext(NewQueryContext);

  const [attributes, setAttributes] = useState<string[]>([]);
  const [data, setData] = useState<{id: string; name: string; }[]>([]);

  const fetchAvailableCollections = async () => {
    try {
      const response = await pathoSpotterApi.get(
        '/search-service/semantic-attributes'
      );
      
      return response.data;
    } catch (error) {
      return semantic_attributes      
    }
  };

  useEffect(() => {
    fetchAvailableCollections().then((data) => {
      setData(data);
    });
  }, []);

  const onChange = (e: CheckboxChangeEvent) => {
    const dataIndex = e.target.id;

    if (
      e.target.checked &&
      dataIndex &&
      !attributes.includes(dataIndex)
    ) {
      setAttributes([...attributes, data[Number(dataIndex)].id]);
      setSemanticAttributes([...attributes, data[Number(dataIndex)].id]);
    } else {
      setAttributes(
        attributes.filter((value) => value !== data[Number(dataIndex)].id)
      );
      setSemanticAttributes(
        attributes.filter((value) => value !== data[Number(dataIndex)].id)
      );
    }
  };

  return (
    <>
      {!data.length ? <LoadingSearchStep /> : data.map((item, index) => (
        <Container key={index}>
          <div>
            <Checkbox id={`${index}`} onChange={onChange} />
            <div>
              <h4>{item.name}</h4>
            </div>
          </div>
        </Container>
      ))}
    </>
  );
}
