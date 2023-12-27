import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Dropdown,
  Image,
  List,
  MenuProps,
  Modal,
  Skeleton,
} from "antd";
import { ButtonPrimary } from "../../pages/NewQuery/styles";
import { pathoSpotterApi } from "../../services/api";
import { NewQueryContext } from "../../hooks/NewQueryContext";
import { getRandomInteger } from "../../utils/utils";
import styles from "./Styles.module.scss";
import { FiBookmark, FiInfo, FiMoreVertical } from "react-icons/fi";

import useAuth from "../../hooks/useAuth";
import { searchSimilarImages } from "../../services/pathoSpotter";
import { useLocation } from "react-router-dom";

interface ModelProbability {
  attribute_name: string;
  probability: number;
}
interface DataType {
  id: number;
  image_url: string;
  picture: {
    large?: string;
    medium?: string;
    thumbnail?: string;
  };
  name: { last: string; }
  nat?: string;
  loading: boolean;
  score: number | string;
  vector?: ModelProbability[];
  query_vector?: ModelProbability[];
}

const count = 6;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

export function ImageListResult() {
  const [urlImageCurrent, setUrlImageCurrent] = useState<string>();

  const items: MenuProps["items"] = [
    {
      label: (
        <a
          rel="noopener noreferrer"
          href={`${process.env.REACT_APP_WEB_URL}/${urlImageCurrent}`}
        >
          New query
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <a rel="noopener noreferrer" href={`${process.env.REACT_APP_WEB_URL}/login`}>
          Download
        </a>
      ),
      key: "1",
    },
  ];
  // ============ Modal Info ======================
  const showMoreInfoModal = (item: DataType) => {
    console.log(item)
    Modal.info({
      title: "",
      content: (
        <div>
          <h1>Image explainability content</h1>
          <div>

          <p>
            <span style={{ fontWeight: 'bold', marginRight: '2px' }}>Image id:</span>
            {item.id}
          </p>
          <p>
            <span style={{ fontWeight: 'bold', marginRight: '2px' }}>Image name:</span>
            {item.name.last}
          </p>
          <p>
            <span style={{ fontWeight: 'bold', marginRight: '2px' }}>Similarity:</span>
            <p style={{ fontSize: 16, marginLeft: '7px' }}>{(item.score as number).toFixed(3)}</p>
          </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>


            <div style={{  marginRight: '20px' }}>
              <h2>Result Image</h2>
              <Image
                width={200}
                height={175}
                style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, marginBottom: '10px' }}
                src={item.picture.thumbnail}
              />


              <h3>Semantic Attributes</h3>

              {item?.vector?.map(row => (
                <div key={row.attribute_name} style={{ marginBottom: '10px' }}>
                  <p style={{ margin: '0', marginBottom: '3px' }}>
                    <span style={{ fontWeight: 'bold', marginRight: '2px' }}>{row.attribute_name}</span>
                    {/* {row.attribute_name} */}
                  </p>
                  <p style={{ margin: '0', marginBottom: '5px' }}>
                    {/* <span style={{ fontWeight: 'bold', marginRight: '2px' }}>Probability:</span> */}
                    {/* {(row.probability * 100).toFixed(3)} % */}
                    <span style={{ color: row.probability > 0.5 ? 'green' : 'red' }}>
                      {row.probability > 0.5 ? 'Present' : 'Not Present'}
                    </span>

                  </p>

                </div>
              ))}
            </div>
            {/* <hr className="linha-horizontal" /> */}

            <div style={{  marginRight: '20px' }}>
              <h2>Query Image</h2>
              <Image
                width={200}
                height={175}
                style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, marginBottom: '5px' }}
                src={`${process.env.REACT_APP_API_URL}/image-query/${imageId}`}
              />
              <h3>Semantic Attributes</h3>

              {item?.query_vector?.map(row => (
                <div key={row.attribute_name} style={{ marginBottom: '10px' }}>
                  <p style={{ margin: '0', marginBottom: '3px' }}>
                    <span style={{ fontWeight: 'bold', marginRight: '2px' }}>{row.attribute_name}</span>
                    {/* {row.attribute_name} */}
                  </p>
                  <p style={{ margin: '0', marginBottom: '5px' }}>
                    {/* <span style={{ fontWeight: 'bold', marginRight: '2px' }}>Probability:</span> */}
                    {/* {(row.probability * 100).toFixed(3)} % */}
                    <span style={{ color: row.probability > 0.5 ? 'green' : 'red' }}>
                      {row.probability > 0.5 ? 'Present' : 'Not Present'}
                    </span>

                  </p>

                </div>
              ))}
            </div>

          </div>
        </div>
      ),
      onOk() { },
      style: { width: 800, height: 800 },
      width: 900,
    });
  };
  // =======================================
  const { newQueryData, setSearchTime, setReturnedItems } = useContext(NewQueryContext);

  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [list, setList] = useState<DataType[]>([]);
  const { getUserData } = useAuth()
  const [privateKey, setPrivateKey] = useState<string>("");
  const [puplicKey, setPuplicKey] = useState<string>("");
  const [imageId, setImageId] = useState<string | null>("");
  const [collectionId, setCollectionId] = useState<string | null>("");
  const [nextPage, setNextPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const location = useLocation();



  function appSetup() {
    getUserData().then((res: any) => {
      setPrivateKey(res.privateKey);
      setPuplicKey(res.publicKey);
      const searchParams = new URLSearchParams(location.search);
      const image_id = searchParams.get('image');
      const collection_id = searchParams.get('collection');
      setImageId(image_id);
      setCollectionId(collection_id);

      const startTime = performance.now();
      searchSimilarImages(
        {
          "private_key": res.privateKey,
          "public_key": res.publicKey,
          "image_id": image_id,
          "collection_id": collection_id
        },
        nextPage
      ).then((data: any) => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        setList(data.items)
        setReturnedItems(data.total)
        setSearchTime(duration)

        setInitLoading(false);
        // console.log(data)
        setNextPage(data.page + 1)
        setLastPage(data.pages)
        setData(data.items)

        console.log(`Tempo de resposta da API: ${duration} milissegundos`);
        console.log(newQueryData.returnedItems);
      })
    });
  }

  useEffect(() => {

    appSetup()
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    setList(data);

    searchSimilarImages(
      {
        "private_key": privateKey,
        "public_key": puplicKey,
        "image_id": imageId,
        "collection_id": collectionId
      },
      nextPage
    ).then((res: { items: any; page: number; }) => {
      // console.log(res)
      const newData = data.concat(...res.items);

      setNextPage(res.page + 1)
      setData(newData);
      setList(newData);
      setLoading(false);


      window.dispatchEvent(new Event("resize"));
    });
  };

  const loadMore =
    !initLoading && !loading && (nextPage <= lastPage) ? (
      <div
        style={{
          display: "flex",
          margin: "0 auto",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          marginTop: 20,
          marginBottom: 150,
        }}
      >
        <ButtonPrimary onClick={onLoadMore}>Loading More</ButtonPrimary>
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
      renderItem={(item, index) => (
        <List.Item>
          <Card
            hoverable
            style={{ width: 420, borderRadius: 10, paddingTop: 10 }}
            cover={
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    paddingRight: 10,
                    marginBottom: 10,
                    gap: 12,
                  }}
                >
                  <FiBookmark
                    fill={index < 5 ? "#000" : "#FFF"}
                    style={{ width: 25, height: 25 }}
                  />
                  <Dropdown
                    menu={{
                      items,
                    }}
                    onOpenChange={() => {
                      setUrlImageCurrent(item.picture.thumbnail);
                    }}
                  >
                    <FiMoreVertical style={{ width: 25, height: 25 }} />
                  </Dropdown>
                </div>
                <Image
                  width={400}
                  height={350}
                  style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                  src={item.picture.thumbnail}
                />
              </>
            }
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: -5,
                marginTop: -10,
              }}
            >
              <h3>Similarity:</h3>
              <p style={{ fontSize: 16, marginLeft: '7px' }}>{(item.score as number).toFixed(3)}</p>
            </div>

            <Divider
              style={{
                marginBottom: 5,
                marginTop: 0,
              }}
            ></Divider>

            <div className={styles.button__container}>
              <button
                type="button"
                className={styles.button}
                onClick={showMoreInfoModal.bind(null, item)}
              >
                <span className={styles.button__text}>More info</span>
                <span className={styles.button__icon}>
                  <FiInfo />
                </span>
              </button>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
}
