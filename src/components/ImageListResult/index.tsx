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

interface DataType {
  id:number;
  image_url: string;
  picture: {
    large?: string;
    medium?: string;
    thumbnail?: string;
  };
  name:{last:string;}
  nat?: string;
  loading: boolean;
  score: number | string;
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
  const showMoreInfoModal = (item:DataType) => {
    console.log(item)
    Modal.info({
      title: "Image explainability content",
      content: (
        <div>
          <p>Image Id {item.id}</p>
          <p>Image Name {item.name.last}</p>
          <p>CONTENT</p>
          <p>CONTENT</p>
          <p>CONTENT</p>
          <p>CONTENT</p>
        </div>
      ),
      onOk() { },
      style: { width: 800, height: 800 },
      width: 900,
    });
  };
  // =======================================
  const { newQueryData } = useContext(NewQueryContext);

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

  const imageList = [
    "https://st4.depositphotos.com/22518918/31524/i/450/depositphotos_315248498-stock-photo-microscopic-photograph-of-a-glomerulus.jpg",
    "https://media.istockphoto.com/id/909807596/pt/foto/sclerosing-glomerulonephritis-biopsy-sample-under-microscopy.jpg?s=612x612&w=0&k=20&c=cb45gwLWXl-ahAxeXkW9_aviSdq-npjR4N4Etklk5TM=",
    "https://media.istockphoto.com/id/1323832668/pt/foto/human-testis-under-the-light-microscope-view-shows-spermatogonia-spermatocytes-in-meiosis.jpg?s=612x612&w=0&k=20&c=-RObeTAizt0tOrP3rwjCMnXwiaF3ibLZ6y0-K-z8K4E=",
    "https://media.istockphoto.com/id/1379380870/pt/foto/kidney-cortex-0-u20195-%C2%B5m-thick-section.jpg?s=612x612&w=0&k=20&c=cOg-mUI-34HH_Pj-z376zCprLlg00KtfmgH4QJPopd4=",
    "https://media.istockphoto.com/id/908235620/pt/foto/acute-nephritis-biopsy-sample-under-microscopy.jpg?s=612x612&w=0&k=20&c=qKDZ1V98Ni6NoS9xVBbX7d1mZtq904tNWeaH4q9qdM0=",
    "https://media.istockphoto.com/id/1379373904/pt/foto/renal-cortex-afferent-arteriole.jpg?s=612x612&w=0&k=20&c=5u7MVKd4nGjgUkLVbF-iv9KZfb_B2CDbFSA8CRy8Yoc=",
    "https://media.istockphoto.com/id/666506432/pt/foto/kidney-cross-section-in-microscopy.jpg?s=612x612&w=0&k=20&c=7FrcGPkJMdsG3mxYeM4ZXXF_81KaUp0FeiHsDA8ZL4E=",
    "https://media.istockphoto.com/id/948759072/pt/foto/histology-of-human-kidney-under-microscope-view-for-education.jpg?s=612x612&w=0&k=20&c=9xpdYT8G2QZtCcwfDr8c0xzj4wE5AHWIku733R0TyAc=",
    "https://media.istockphoto.com/id/840250682/pt/foto/kidney-histology.jpg?s=612x612&w=0&k=20&c=GdHgdA8PCY6pU1L4XlyzPafC8H_XlSAQ7U6C6IsqIlg=",
    "https://st2.depositphotos.com/3413075/10679/i/450/depositphotos_106794368-stock-photo-human-nephrons-anatomy.jpg",
    "https://static5.depositphotos.com/1014098/455/i/450/depositphotos_4550285-stock-photo-extracapillary-glomerulonephritis.jpg",
    "https://st3.depositphotos.com/15723030/18014/i/450/depositphotos_180147440-stock-photo-kidney-pas.jpg",
    "https://st5.depositphotos.com/79270370/65824/i/450/depositphotos_658246648-stock-photo-kidney-star-single-glomerulus-closeup.jpg",
    "https://media.istockphoto.com/id/908220838/pt/foto/acute-nephritis-biopsy-sample-under-microscopy.jpg?s=612x612&w=0&k=20&c=Odv_ym83Iz1cT9R4-TBsUiY7YMm0NQMeTjT6w50jnlg=",
    "https://media.istockphoto.com/id/965908010/pt/foto/histology-of-human-kidney-under-microscope-view-for-education-histology-human-tissue.jpg?s=612x612&w=0&k=20&c=qnz2lm9gR7KNTFjcy_SeJlUah-NsYvJ5izRa7bhQpLw=",
    "https://media.istockphoto.com/id/1061813552/pt/foto/contracted-kidney-light-micrograph.jpg?s=612x612&w=0&k=20&c=smWfgKHJDnYOlRmeI81GmjmwHAcGAVjqzbfMbc31Thk=",
    "https://media.istockphoto.com/id/908227854/pt/foto/acute-nephritis-biopsy-sample-under-microscopy.jpg?s=612x612&w=0&k=20&c=CLWYga9CbsAQo-IeLbyyKQswc8bAXZn9-zqBRFIBNFQ=",
    "https://media.istockphoto.com/id/861209044/pt/foto/kidney-glomeruli.jpg?s=612x612&w=0&k=20&c=q8wtM55ttoin4eplvZv0zw_bb6IkT95i8WlG6sY3DJY=",
    "https://media.istockphoto.com/id/1321565511/pt/foto/kidney-glomerulus.jpg?s=612x612&w=0&k=20&c=mCva6uwWWyDhFgRPTsUqDsBHhfpVl5wC2YZW68fre1s=",
    "https://media.istockphoto.com/id/1379381416/pt/foto/kidney-cortex-0-u20195-%C2%B5m-thick-section.jpg?s=612x612&w=0&k=20&c=DepikWD0mgGzLdNyvaXTHLRHnEU4kg-bs73QMT4L2tM=",
    "https://media.istockphoto.com/id/1335852099/pt/foto/acute-appendicitis-of-human-body-with-inflammed-appendix-and-light-micrograph-photo-under.jpg?s=612x612&w=0&k=20&c=o7t1_vn7hxtV_LX7Oy4t33XsuRHgQhP2W6TH2nP5XYs=",
    "https://media.istockphoto.com/id/1334771384/pt/foto/tissue-form-anal-canal-histopathology-slide-microscopic-40x-show-basaloid-squamous-cell.jpg?s=612x612&w=0&k=20&c=YzifnKfIeR_4aJd_XKR4dU-4DmxBdtRsiOSn6pmwH9w=",
    "https://media.istockphoto.com/id/918905782/pt/foto/mouse-kidney-under-the-microscope.jpg?s=612x612&w=0&k=20&c=yJ5HBvm5DF1HEqanqUXO0QSOpIV_tyopjmS18GKx-Aw=",
    "https://media.istockphoto.com/id/652641558/pt/foto/histology-of-human-kidney-under-microscope-view.jpg?s=612x612&w=0&k=20&c=zLmAK2NqmzTtvv7BzSrFlVmgPB5MLwJ_mt59M_XK65A=",
    "https://media.istockphoto.com/id/698912140/pt/foto/kidney.jpg?s=612x612&w=0&k=20&c=waRA3viyI8P2UfvAxOK29C8BcuTy-e3ZMXCbVnr2rpY=",
    "https://media.istockphoto.com/id/1379373908/pt/foto/kidney-cortex-medullary-rays.jpg?s=612x612&w=0&k=20&c=KWXe0IjyPv55nsxvk5cF7_eUyVzvjEumr9A2t1gUsJU=",
    "https://media.istockphoto.com/id/666506432/pt/foto/kidney-cross-section-in-microscopy.jpg?s=612x612&w=0&k=20&c=7FrcGPkJMdsG3mxYeM4ZXXF_81KaUp0FeiHsDA8ZL4E=",
    "https://media.istockphoto.com/id/1323832668/pt/foto/human-testis-under-the-light-microscope-view-shows-spermatogonia-spermatocytes-in-meiosis.jpg?s=612x612&w=0&k=20&c=-RObeTAizt0tOrP3rwjCMnXwiaF3ibLZ6y0-K-z8K4E=",
    "https://media.istockphoto.com/id/937463412/pt/foto/renal-corpuscles-filtering-the-blood-in-the-kidney.jpg?s=612x612&w=0&k=20&c=OyK9CN-QmqcYKgMAnFm1BitrXknhuhFcpBGD4ahhxw4=",
  ];


  function appSetup() {
    getUserData().then((res: any) => {
      setPrivateKey(res.privateKey);
      setPuplicKey(res.publicKey);
      const searchParams = new URLSearchParams(location.search);
      const image_id = searchParams.get('image');
      const collection_id = searchParams.get('collection');
      setImageId(image_id);
      setCollectionId(collection_id);
      searchSimilarImages(
        {
          "private_key": res.privateKey,
          "public_key": res.publicKey,
          "image_id": image_id,
          "collection_id": collection_id
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
              <h3>Score:</h3>
              <p style={{ fontSize: 16 }}>{item.score}</p>
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
