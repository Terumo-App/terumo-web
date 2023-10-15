import React, { useEffect, useRef, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import {
  Dropdown,
  Form,
  Input,
  InputRef,
  Modal,
  Radio,
  message,
  theme,
} from "antd";
import { Space, Table, Tag } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import { FiBookmark, FiHardDrive, FiPlus } from "react-icons/fi";

import { Header } from "../../components/Header";
import { ButtonPrimary, Container, PageTittle } from "./styles";

import { LockOutlined, GlobalOutlined } from "@ant-design/icons";
import { getCollectionsQuery, addNewCollection } from "../../services/pathoSpotter";
import { TweenOneGroup } from "rc-tween-one";
import useAuth from "../../hooks/useAuth";


const items = [
  { key: "1", label: "Edit" },
  { key: "2", label: "Remove" },
  { key: "3", label: "Share" },
  { key: "4", label: "Trigger Indexing" },
];

/**  { key: '1', label: 'Upload Images' },
  { key: '2', label: 'Share' },
  { key: '3', label: 'Add to favorite' },
  { key: '4', label: 'Download' }, */

export interface DataType {
  key: string;
  date: string;
  type: React.ReactElement | string;
  name: string;
  items: number | string;
  owner: string;
}

export function Collections() {
  // ================ metadatas ==================
  const [tags, setTags] = useState(["default"]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [userData, SetUserData] = useState({} as any);
  const inputRef = useRef<InputRef>(null);
  const { getUserData } = useAuth()


  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  // const showInput = () => {
  //   setInputVisible(true);
  // };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value);
  // };

  // const handleInputConfirm = () => {
  //   if (inputValue && tags.indexOf(inputValue) === -1) {
  //     setTags([...tags, inputValue]);
  //   }
  //   setInputVisible(false);
  //   setInputValue("");
  //   console.log("enviar request para add aqui")

  // };

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
  type TablePaginationPosition =
    | "topLeft"
    | "topCenter"
    | "topRight"
    | "bottomLeft"
    | "bottomCenter"
    | "bottomRight";

  const columns: ColumnsType<DataType> = [
    {
      dataIndex: "type",
      title: "Type",
      render: (tag) => (
        <Tag
          style={{
            borderRadius: 5,
            width: 77,
            height: 25,
            display: "flex",
            alignItems: "center",
          }}
          icon={tag === "Public" ? <GlobalOutlined /> : <LockOutlined />}
          color={tag === "Public" ? "success" : "warning"}
        >
          {tag}
        </Tag>
      ),
    },
    {
      dataIndex: "name",
      title: "Name",
    },
    {
      dataIndex: "items",
      title: "Items",
    },
    {
      dataIndex: "date",
      title: "Last Update",
    },
    {
      dataIndex: "owner",
      title: "Owner",
    },
    {
      dataIndex: "action",
      title: "Action",
      render: (key, data) => (
        <Space
          size="middle"
          style={{ display: "flex", gap: 20, alignItems: "center" }}
        >
          <a
            href={`http://localhost:3000/collections/${data.key}`}
            style={{
              color: "#702331",
            }}
          >
            View
          </a>
          <Dropdown menu={{ items }}>
            <a
              style={{
                color: "#702331",
              }}
            >
              More <DownOutlined />
            </a>
          </Dropdown>

          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <FiBookmark
              fill={Number(data.key) < 6 ? "#702331" : "#FFF"}
              style={{ width: 20, height: 20, color: "#702331" }}
            />
          </div>
        </Space>
      ),
    },
  ];

  const [data, setData] = useState<any>([]);
  const [privateKey, setPrivateKey] = useState<string>("");
  const [puplicKey, setPuplicKey] = useState<string>("");


  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${month}-${day}-${year}`;
  }

  function appSetup() {
    getUserData().then((res: any) => {
      // console.log(res.privateKey, res.publicKey)
      setPrivateKey(res.privateKey);
      setPuplicKey(res.publicKey);

      getCollectionsQuery(
        {
          "private_key": res.privateKey,
          "public_key": res.publicKey
        }
      ).then((data) => {
        const mapped = data.data.map((obj: any) => {
          let dd = {
            key: obj._id,
            name: obj._name,
            owner: obj._owner,
            date: formatDate(new Date(parseInt(obj._created_at))),
            items: `${obj._num_of_images}`,
            type: obj._type,
          }
          return dd
        })
        console.log(mapped);
        setData(mapped);


      });
    });
  }

  useEffect(() => {
    appSetup()

  }, []);

  const metadatas = [
    "Forrado",
    "Marionete",
    "Cirurgião",
    "Nota",
    "Granada",
    "Eco",
    "Bigode",
    "Adolescente",
    "Partido",
    "Dinamite",
  ];

  const defaultTitle = () => "Here is title";
  const defaultFooter = () => "Here is footer";

  const [size, setSize] = useState<SizeType>("large");
  const [showTitle, setShowTitle] = useState(false);
  const [showfooter, setShowFooter] = useState(false);
  const [rowSelection, setRowSelection] = useState<
    TableRowSelection<DataType> | undefined
  >({});
  const [hasData, setHasData] = useState(true);
  const [tableLayout, setTableLayout] = useState();
  const [top, setTop] = useState<TablePaginationPosition | "none">("none");
  const [bottom, setBottom] = useState<TablePaginationPosition>("bottomRight");
  const [ellipsis, setEllipsis] = useState(false);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState<string>();

  const scroll: { x?: number | string; y?: number | string } = {};
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll) {
    scroll.x = "100vw";
  }

  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis,
  }));
  if (xScroll === "fixed") {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = "right";
  }

  const tableProps: TableProps<DataType> = {
    bordered: false,
    loading: false,
    expandable: {
      expandedRowRender: (record: DataType) => (
        <>
          <h4>Metadatas:</h4>
          <Tag>{metadatas[7]}</Tag> <Tag>{metadatas[3]}</Tag>
          <Tag>{metadatas[5]}</Tag>
          <h4 style={{ marginTop: 10 }}>Associated Articles</h4>
        </>
      ),
    },
    size,
    title: showTitle ? defaultTitle : undefined,
    showHeader: true,
    footer: showfooter ? defaultFooter : undefined,
    rowSelection: undefined,
    scroll,
    tableLayout,
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);


    addNewCollection(
      {
        "private_key": privateKey,
        "public_key": puplicKey,
        "collection_name": form.getFieldInstance('name').input.value
      }
    ).then(el => {
      appSetup()
      message.success(`Collection added successfully!`);
      form.resetFields(['name'])
      
    }).catch(err => message.error(`Error adding Collection!`));

  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />

      <Container>
        <PageTittle>
          <FiHardDrive />
          <h3>Collections</h3>
        </PageTittle>

        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: -20,
            }}
          >
            <ButtonPrimary
              onClick={showModal}
              style={{ marginBottom: 20, width: 200, height: 50 }}
            >
              Add Collection
            </ButtonPrimary>

            <Modal
              title="Add Collection"
              open={isModalOpen}
              onOk={handleOk}
              okText="Add"
              onCancel={handleCancel}
            >
              <Form form={form} layout="vertical" autoComplete="off">
                {/* <Form.Item label="Type:">
                  <Radio.Group>
                    <Radio value="public"> Public </Radio>
                    <Radio value="private"> Private </Radio>
                  </Radio.Group>
                </Form.Item> */}
                <Form.Item name="name" label="Name:">
                  <Input placeholder="Type collection name" />
                </Form.Item>
                {/* <Form.Item label="Metadatas:">
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
                </Form.Item> */}
              </Form>
            </Modal>
          </div>

          <Table
            {...tableProps}
            pagination={{
              position: [top as TablePaginationPosition, bottom],
            }}
            columns={tableColumns}
            dataSource={hasData ? data : []}
            scroll={scroll}
          />
        </>
      </Container>
    </>
  );
}
