import { Header } from '../../components/Header';
import React, { useContext, useState } from 'react';
import { Container, Content, ImageListContent, InfoQueryBox, PageTittle } from './styles';
import { FiCheck } from 'react-icons/fi';
// import { CollectionsSelect } from "../../components/CollectionsSelect";
import styles from './Styles.module.scss';
import { NewQueryContext } from '../../hooks/NewQueryContext';
import { Button } from 'antd';
import { ImageListResult } from '../../components/ImageListResult';
import { getRandomInteger } from '../../utils/utils';

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
    title: 'Bed',
  },
  {
    img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
    title: 'Books',
  },
  {
    img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
    title: 'Sink',
  },
  {
    img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
    title: 'Kitchen',
  },
  {
    img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
    title: 'Blinds',
  },
  {
    img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
    title: 'Chairs',
  },
  {
    img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
    title: 'Laptop',
  },
  {
    img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
    title: 'Doors',
  },
  {
    img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
    title: 'Storage',
  },
  {
    img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
    title: 'Candle',
  },
  {
    img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
    title: 'Coffee table',
  },
];

export function QueryResult() {
  const { createNewQuery } = useContext(NewQueryContext);

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
            <div>
              <span>Items Returned: </span>
              <span>{getRandomInteger(20, 49)}</span>
            </div>

            <div>
              <span>Search Time: </span>
              <span>{getRandomInteger(3000, 3999)}ms</span>
            </div>
          </InfoQueryBox>

          <Button
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
          </Button>

          <ImageListContent>
            <ImageListResult />
          </ImageListContent>
          
          
        </Content>
      </Container>
    </>
  );
}
