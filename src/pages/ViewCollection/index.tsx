import { Header } from '../../components/Header';
import React, { useContext, useState } from 'react';
import { Container, Content, ImageListContent, InfoQueryBox, PageTittle } from './styles';
import { FiCheck, FiPlus } from 'react-icons/fi';
// import { CollectionsSelect } from "../../components/CollectionsSelect";
import styles from './Styles.module.scss';
import { NewQueryContext } from '../../hooks/NewQueryContext';
import { Button } from 'antd';
import { ImageListCollection } from '../../components/ImageListCollection';
import { getRandomInteger } from '../../utils/utils';
import { useParams } from 'react-router-dom';


export function ViewCollection() {
  const { createNewQuery } = useContext(NewQueryContext);
  
const params = useParams();
console.log(params);

  return (
    <>
      <Header />

      <Container>
        <PageTittle>
          <FiCheck />
          <h3>Collection images</h3>
        </PageTittle>

        <Content>
          <InfoQueryBox>
            <div>
              <span>Total de imagens: </span>
              <span>{getRandomInteger(20, 49)}</span>
            </div>
          </InfoQueryBox>

          <Button
            style={{
              position: 'absolute',
              width: '160px',
              height: '50px',
              top: '70px',
              right: '80px',
              background: '#702331',
              borderRadius: '8px',
              color: '#FFF',
              fontWeight: 700,
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <span>Add image</span>
            <FiPlus style={{marginLeft: 10, color: 'white'}} />
          </Button>

          <ImageListContent>
            <ImageListCollection />
          </ImageListContent>
          
          
        </Content>
      </Container>
    </>
  );
}
