import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { Space, Table, Tag } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import type { ColumnsType, TableProps } from 'antd/es/table';
import type {
  TableRowSelection,
} from 'antd/es/table/interface';
import { FiHardDrive } from 'react-icons/fi';

import { Header } from '../../components/Header';
import { Container, PageTittle } from './styles';

import { LockOutlined, GlobalOutlined } from '@ant-design/icons';

const tags = ['Public', 'Private'];
const items = [
    { key: '1', label: 'Edit' },
    { key: '2', label: 'Remove' },
    { key: '3', label: 'Save' },
  ];

export function Collections() {
  interface DataType {
    key: string;
    date: string;
    type: React.ReactElement | string;
    name: string;
    items: number | string;
    owner: string;
  }

  type TablePaginationPosition =
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomCenter'
    | 'bottomRight';

  const columns: ColumnsType<DataType> = [
    {
      dataIndex: 'type',
      title: 'Type',
      render: (tag) => (
        <Tag
          style={{
            borderRadius: 5,
            width: 77,
            height: 25,
            display: 'flex',
            alignItems: 'center',
          }}
          icon={
            tag === 'Public' ? <GlobalOutlined /> : <LockOutlined />
          }
          color={tag === 'Public' ? 'success' : 'warning'}>
          {tag}
        </Tag>
      ),
    },
    {
      dataIndex: 'name',
      title: 'Name',
    },
    {
      dataIndex: 'items',
      title: 'Items',
    },
    {
      dataIndex: 'date',
      title: 'Last Update',
    },
    {
      dataIndex: 'owner',
      title: 'Owner',
    },
    {
      dataIndex: 'action',
      title: 'Action',
      render: (key) => (
        <Space size="middle">
          <a
            style={{
              color: '#702331',
            }}>
            View
          </a>
          <Dropdown menu={{ items }}>
              <a style={{
              color: '#702331',
            }}>
                More <DownOutlined />
              </a>
          </Dropdown>        
        </Space>
      ),
    },
  ];

  const data: DataType[] = [];
  for (let i = 1; i <= 20; i++) {
    data.push({
      key: i.toString(),
      name: `Collection ${i + 1}`,
      owner: `Proprietário ${i + 1}`,
      date: '12-27-2023',
      items: `${i + i * i}`,
      type: tags[i % 2],
    });
  }

  const defaultTitle = () => 'Here is title';
  const defaultFooter = () => 'Here is footer';

  const [size, setSize] = useState<SizeType>('large');
  const [showTitle, setShowTitle] = useState(false);
  const [showfooter, setShowFooter] = useState(false);
  const [rowSelection, setRowSelection] = useState<
    TableRowSelection<DataType> | undefined
  >({});
  const [hasData, setHasData] = useState(true);
  const [tableLayout, setTableLayout] = useState();
  const [top, setTop] = useState<TablePaginationPosition | 'none'>(
    'none'
  );
  const [bottom, setBottom] =
    useState<TablePaginationPosition>('bottomRight');
  const [ellipsis, setEllipsis] = useState(false);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState<string>();

  const scroll: { x?: number | string; y?: number | string } = {};
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll) {
    scroll.x = '100vw';
  }

  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis,
  }));
  if (xScroll === 'fixed') {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = 'right';
  }

  const tableProps: TableProps<DataType> = {
    bordered: false,
    loading: false,
    expandable: {
      expandedRowRender: (record: DataType) => <p>{record.owner}</p>,
    },
    size,
    title: showTitle ? defaultTitle : undefined,
    showHeader: true,
    footer: showfooter ? defaultFooter : undefined,
    rowSelection: undefined,
    scroll,
    tableLayout,
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
