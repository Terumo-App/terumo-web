import { Header } from "../../components/Header";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Container,
  Content,
  ImageListContent,
  InfoQueryBox,
  PageTittle,
} from "./styles";
import { FiCheck, FiPlus } from "react-icons/fi";
// import { CollectionsSelect } from "../../components/CollectionsSelect";
import styles from "./Styles.module.scss";
import { NewQueryContext } from "../../hooks/NewQueryContext";
import {
  Button,
  Input,
  Modal,
  Form,
  Tag,
  InputRef,
  UploadProps,
  message,
} from "antd";
import { ImageListCollection } from "../../components/ImageListCollection";
import { getRandomInteger } from "../../utils/utils";
import { useParams } from "react-router-dom";
import { TweenOneGroup } from "rc-tween-one";
import Dragger from "antd/lib/upload/Dragger";
import { InboxOutlined, FileImageOutlined } from "@ant-design/icons";
import { getImageList } from "../../services/pathoSpotter";
import useAuth from "../../hooks/useAuth";

const props: UploadProps = {
  name: "file",
  multiple: false,
  action: "https://httpstat.us/200",
  accept: ".png, .jpeg",
  listType: "picture",
  showUploadList: { showPreviewIcon: true },
  progress: {},
  async onChange(info) {
    const { status } = info.file;
    // console.log(getBase64(info.file.originFileObj as File)); // prints the base64 string

    /*if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }*/
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
  onRemove(file) {
    console.log("Removed file: ", file);
  },
};

export function ViewCollection() {
  // ================ metadatas ==================
  const [tags, setTags] = useState(["default"]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [numberOfImages, setNumberOfImages] = useState("");
  const inputRef = useRef<InputRef>(null);
  const { getUserData } = useAuth()
  const params = useParams();

  function appSetup() {
    getUserData().then((res: any) => {
      getImageList(
        {
          "private_key": res.privateKey,
          "public_key": res.publicKey,
          "collection_id": params.key
        },
        1
      ).then((data: any) => setNumberOfImages(data.total))
    })
  }



  useEffect(() => {
    appSetup()
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const forMap = (tag: string) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: "inline-block" }}>
        {tagElem}
      </span>
    );
  };

  const tagChild = tags.map(forMap);

  const tagPlusStyle: React.CSSProperties = {
    background: "",
    borderStyle: "dashed",
  };
  // =============================================
  const { createNewQuery } = useContext(NewQueryContext);


  console.log(params);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    message.success(`Image added successfully!`);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
              <span>{numberOfImages}</span>
            </div>
          </InfoQueryBox>

          <Button
            style={{
              position: "absolute",
              width: "160px",
              height: "50px",
              top: "70px",
              right: "80px",
              background: "#702331",
              borderRadius: "8px",
              color: "#FFF",
              fontWeight: 700,
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={showModal}
          >
            <span>Add image</span>
            <FiPlus style={{ marginLeft: 10, color: "white" }} />
          </Button>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: -20,
            }}
          >
            <Modal
              title="Add Image"
              open={isModalOpen}
              onOk={handleOk}
              okText="Add"
              onCancel={handleCancel}
            >
              <Form form={form} layout="vertical" autoComplete="off">
                <Form.Item label="Name:">
                  <Input placeholder="Type image name" />
                </Form.Item>
                <Form.Item label="Upload image:">
                  <Dragger style={{ width: "100%" }} {...props}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <h3 className="ant-upload-text">
                      Drag and Drop files here
                    </h3>
                  </Dragger>
                </Form.Item>

                <Form.Item label="Metadatas:">
                  <>
                    <div style={{ marginBottom: 16 }}>
                      <TweenOneGroup
                        enter={{
                          scale: 0.8,
                          opacity: 0,
                          type: "from",
                          duration: 100,
                        }}
                        onEnd={(e: any) => {
                          if (e.type === "appear" || e.type === "enter") {
                            (e.target as any).style = "display: inline-block";
                          }
                        }}
                        leave={{
                          opacity: 0,
                          width: 0,
                          scale: 0,
                          duration: 200,
                        }}
                        appear={false}
                      >
                        {tagChild}
                      </TweenOneGroup>
                    </div>
                    {inputVisible ? (
                      <Input
                        ref={inputRef}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputConfirm}
                        onPressEnter={handleInputConfirm}
                      />
                    ) : (
                      <Tag onClick={showInput} style={tagPlusStyle}>
                        <FiPlus /> New Metadata
                      </Tag>
                    )}
                  </>
                </Form.Item>
              </Form>
            </Modal>
          </div>

          <ImageListContent>
            <ImageListCollection />
          </ImageListContent>
        </Content>
      </Container>
    </>
  );
}
