import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Divider,
  Dropdown,
  Image,
  List,
  MenuProps,
  Modal,
  Tag,
} from "antd";
import { ButtonPrimary } from "../../pages/NewQuery/styles";
import { NewQueryContext } from "../../hooks/NewQueryContext";
import { getRandomInteger } from "../../utils/utils";
import { mockImageMetadatas } from "../../services/mockApiData";
import { FiBookmark, FiMoreVertical, FiTrash2 } from "react-icons/fi";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { getImageList } from "../../services/pathoSpotter";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";


interface DataType {
  image_url: string;
  picture: {
    large?: string;
    medium?: string;
    thumbnail?: string;
  };
  name: {
    last: string;
  };
  nat?: string;
  loading: boolean;
  score: number | string;
}

const count = 6;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

export function ImageListCollection() {
  // ============ Modal confirm ======================
  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "Are you sure delete this image?",
      icon: <ExclamationCircleFilled />,
      content: "The image will be deleted from the collection.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  // =======================================

  const { newQueryData } = useContext(NewQueryContext);

  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [list, setList] = useState<DataType[]>([]);
  const [urlImageCurrent, setUrlImageCurrent] = useState<string>();
  const { getUserData } = useAuth()
  const [privateKey, setPrivateKey] = useState<string>("");
  const [puplicKey, setPuplicKey] = useState<string>("");
  const [nextPage, setNextPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const params = useParams();
 
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
        <a rel="noopener noreferrer" href={`${process.env.REACT_APP_WEB_URL}/login}`}>
          Download
        </a>
      ),
      key: "1",
    },
    {
      label: (
        <a rel="noopener noreferrer" href={`${process.env.REACT_APP_WEB_URL}/login`}>
          Edit metadata
        </a>
      ),
      key: "2",
    },
  ];

  function appSetup() {
    getUserData().then((res: any) => {
      setPrivateKey(res.privateKey);
      setPuplicKey(res.publicKey);

      getImageList(
        {
          "private_key": res.privateKey,
          "public_key": res.publicKey,
          "collection_id": params.key
        },
        nextPage
      ).then((data: any) => {
        setInitLoading(false);
        // console.log(data)
        setNextPage(data.page + 1)
        setLastPage(data.pages)
        setData(data.items)
        setList(data.items)

      })




    });
  }


  useEffect(() => {
    // fetch(fakeDataUrl)
    //   .then((res) => res.json())
    //   .then((res) => {
    //     setInitLoading(false);

    //     console.log(res.results);
    //     const newData = data.concat(res.results);
    //     const aux = newData.map((item, index) => {
    //       return {
    //         ...item,
    //         picture: {
    //           thumbnail: imageList[index],
    //         },
    //         score: `0.${getRandomInteger(9000, 9999)}`,
    //       };
    //     });

    //     setData(aux.sort((a, b) => Number(a.score) - Number(b.score)));
    //     setList(aux.sort((a, b) => Number(a.score) - Number(b.score)));
    //   });
    appSetup()

  }, []);

  const onLoadMore = () => {
    setLoading(true);
    setList(data);

    getImageList(
      {
        "private_key": privateKey,
        "public_key": puplicKey,
        "collection_id": params.key
      },
      nextPage
    ).then((res) => {
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
    !initLoading && !loading  && (nextPage<=lastPage)? (
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
                  <FiTrash2
                    style={{ width: 25, height: 25 }}
                    onClick={showDeleteConfirm}
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
                  width={"100%"}
                  height={350}
                  style={{}}
                  src={item.picture.thumbnail}
                />
              </>
            }
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "baseline",
                justifyContent: "space-between",
                marginBottom: -20,
                marginTop: -10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 10,
                  marginBottom: 0,
                }}
              >
                <h3>Name:</h3>
                <p style={{ fontSize: 16 }}>{item.name.last}</p>
              </div>

              <div style={{ textAlign: "left", width: "100%" }}>
                <Divider
                  style={{
                    marginBottom: 5,
                    marginTop: -5,
                  }}
                ></Divider>
                <h4>Metadatas:</h4>
                <Tag>{mockImageMetadatas()[0]}</Tag>
                <Tag>{mockImageMetadatas()[1]}</Tag>
                <Tag>{mockImageMetadatas()[2]}</Tag>
                <Tag>{mockImageMetadatas()[3]}</Tag>
              </div>
              <div style={{ textAlign: "left", width: "100%" }}>
                <Divider
                  style={{
                    marginBottom: 5,
                    marginTop: 15,
                  }}
                ></Divider>
                <h4 style={{ marginTop: 10 }}>Associated Articles:</h4>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 16 }}>-- --</p>
                </div>
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
}
