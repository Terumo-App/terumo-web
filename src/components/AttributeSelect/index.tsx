import { Checkbox } from 'antd';
import { Container } from './styles';

import React, { useState, useContext } from 'react';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { NewQueryContext } from '../../hooks/NewQueryContext';

export function AttributeSelect() {
  const { setSemanticAttributes } = useContext(NewQueryContext);

  const [attributes, setAttributes] = useState<string[]>([]);

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
      <Container>
        <div>
          <Checkbox id="1" onChange={onChange} />
        </div>

        <div>
          <h4>Attribute 1</h4>
        </div>
      </Container>

      <Container>
        <div>
          <Checkbox id="2" onChange={onChange} />
        </div>

        <div>
          <h4>Attribute 2</h4>
        </div>
      </Container>

      <Container>
        <div>
          <Checkbox id="3" onChange={onChange} />
        </div>

        <div>
          <h4>Attribute 3</h4>
        </div>
      </Container>

      <Container>
        <div>
          <Checkbox id="4" onChange={onChange} />
        </div>

        <div>
          <h4>Attribute 4</h4>
        </div>
      </Container>
    </>
  );
}
