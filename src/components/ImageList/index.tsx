import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Button, Card, Image, List, Skeleton } from 'antd';
import { ButtonPrimary } from '../../pages/NewQuery/styles';
import ApiClient from '../../services/api';
import { NewQueryContext } from '../../hooks/NewQueryContext';
import { useLocation } from 'react-router-dom';


interface DataType {
  image_url: string;
  distance: number;
  picture: {
    large?: string;
    medium?: string;
    thumbnail?: string;
  };
  nat?: string;
  loading: boolean;
}

interface BodyData {
  image_base64: string | null | undefined;
  semantic_attributes: AtributeItemData[]
}

interface AtributeItemData {
  id: string;
  name: string
}

const count = 6;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

export function ImageList() {
  // const { newQueryData } = useContext(NewQueryContext);
  const location = useLocation();

  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [list, setList] = useState<DataType[]>([]);

  const api = new ApiClient()

  const fetchQueryImages = async () => {
    
    
    const searchParams = new URLSearchParams(location.search);
    const image_id = searchParams.get('image');
    const attributes = searchParams.get('attributes');

    console.log(image_id, attributes?.split(","))
    const res = await api.executeQuery({
      image_metadata:{ id: image_id},
      semantic_attributes: attributes?.split(",")?.map(item => { return { id: item, name: item } })
    })

    setInitLoading(false);
    setData(res);
    setList(res);
  };

  useEffect(() => {
    fetchQueryImages();
  }, []);


  // useEffect(() => {
  //   fetch(fakeDataUrl)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setInitLoading(false);

  //       console.log(res.results);
  //       const newData = data.concat(res.results);
  //       const aux = newData.map((item, index) => {return {
  //         ...item,
  //         picture: {
  //           thumbnail: imageList[index],
  //         }
  //       }})

  //       setData(aux);
  //       setList(aux);
  //     });
  // }, []);

  // const onLoadMore = () => {
  //   setLoading(true);
  //   setList(
  //     data

  //   );
  //   console.log(data);
  //   fetch(fakeDataUrl)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       const newData = data.concat(...res.results);

  //       const aux = newData.map((item, index) => {
  //         return {
  //           ...item,
  //           picture: {
  //             thumbnail: imageList[index],
  //           }
  //         }
  //       })
  //       setData(aux);
  //       setList(aux);
  //       setLoading(false);
  //       // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
  //       // In real scene, you can using public method of react-virtualized:
  //       // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
  //       window.dispatchEvent(new Event('resize'));
  //     });
  // };

  // const onLoadMore2 = () => {
  //   setLoading(true);
  //   setList(
  //     data.concat(
  //       [...new Array(count)].map(() => ({
  //         loading: true,
  //         name: {},
  //         picture: {},
  //       }))
  //     )
  //   );


  //   const results = imageList.filter((x, index) => index < 2).map(item => {
  //     return {
  //       loading: true,
  //       name: {},
  //       picture: {
  //         large: item,
  //         medium: item,
  //         thumbnail: item,
  //       },
  //     }
  //   });

  //   const newData = results;
  //   setData(newData);
  //   setList(newData);
  //   setLoading(false);

  //   window.dispatchEvent(new Event('resize'));
  // };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          display: 'flex',
          margin: '0 auto',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          marginTop: 20,
          marginBottom: 150,
        }}>
        {/* <ButtonPrimary onClick={onLoadMore}>Loading More</ButtonPrimary> */}
      </div>
    ) : null;



  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }}
      className="demo-loadmore-list"
      loading={initLoading}
      loadMore={loadMore}
      dataSource={list}
      style={{ marginInline: 60 }}
      renderItem={(item) => (
        <List.Item >
          <Card
            hoverable
            style={{ width: 420, borderRadius: 10, paddingTop: 10 }}
            cover={<Image
              width={400}
              height={350}
              style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
              src={item.image_url}
            />}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: -20, marginTop: -10 }}>
              <h3>Score:</h3> &nbsp; <p style={{ fontSize: 16 }}>{1 - item.distance}</p>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
}
