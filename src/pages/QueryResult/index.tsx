import { Header } from '../../components/Header';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Content, ImageListContent, InfoQueryBox, PageTittle } from './styles';
import { FiCheck } from 'react-icons/fi';
// import { CollectionsSelect } from "../../components/CollectionsSelect";
import styles from './Styles.module.scss';
import { NewQueryContext } from '../../hooks/NewQueryContext';
import { Button } from 'antd';
import { ImageListResult } from '../../components/ImageListResult';
import { getRandomInteger } from '../../utils/utils';



export function QueryResult() {
  
  const { newQueryData, createNewQuery } = useContext(NewQueryContext);

  useEffect(() => {

    console.log(newQueryData)
  }, [newQueryData]);
  
  return (
    <>
      <Header />

      <Container>
        <PageTittle>
          <FiCheck />
          <h3>Query Result</h3>
        </PageTittle>

        <Content>
          <InfoQueryBox>
          {newQueryData && newQueryData.returnedItems && (
            <>
            <div>
              <span>Returned Items: </span>
              <span>{newQueryData.returnedItems}</span>
            </div>

            <div>
              <span>Search Time: </span>
              <span>{newQueryData.searchTime}ms</span>
            </div>
            </>
          )}
          </InfoQueryBox>

          {/* <Button
            style={{
              position: 'absolute',
              width: '200px',
              height: '50px',
              top: '70px',
              right: '80px',
              background: '#702331',
              borderRadius: '8px',
              color: '#FFF',
              fontWeight: 700,
              fontSize: '18px',
            }}>
            Save Result
          </Button> */}

          <ImageListContent>
            <ImageListResult />
          </ImageListContent>
          
          
        </Content>
      </Container>
    </>
  );
}
