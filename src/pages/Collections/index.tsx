import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Form, Input, Modal, Radio } from "antd";
import { Space, Table, Tag } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import { FiBookmark, FiHardDrive } from "react-icons/fi";

import { Header } from "../../components/Header";
import { ButtonPrimary, Container, PageTittle } from "./styles";

import { LockOutlined, GlobalOutlined } from "@ant-design/icons";
import { getCollectionsQuery } from "../../services/pathoSpotter";

const items = [
  { key: "1", label: "Edit" },
  { key: "2", label: "Remove" },
  { key: "3", label: "Share" },

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
        <Space size="middle" style={{ display: 'flex', gap: 20, alignItems: 'center'}}>
          
          <a href={`http://localhost:3000/collections/${data.key}`}
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
          
          <div style={{ alignItems: "center", justifyContent: 'center', display: 'flex'}}>
            <FiBookmark fill={"#702331"} style={{ width: 20, height: 20,color: "#702331" }}/>
          </div>
        </Space>
      ),
    },
  ];

  const [data, setData] = useState<any>([]);

  useEffect(() => {
    getCollectionsQuery().then((data) => {
      setData(data);
    });
  }, []);

  const metadatas = ["Forrado",
    "Gemido", 
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
      expandedRowRender: (record: DataType) => <><h4>Metadatas:</h4><Tag>{metadatas[7]}</Tag> <Tag>{metadatas[3]}</Tag> <Tag>{metadatas[5]}</Tag> <h4 style={{marginTop: 10}}>Associated Articles</h4></>,
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
                <Form.Item label="Type:">
                  <Radio.Group>
                    <Radio value="public"> Public </Radio>
                    <Radio value="private"> Private </Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="Name:">
                  <Input placeholder="Type collection name" />
                </Form.Item>
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
