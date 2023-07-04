
import { Checkbox } from 'antd';
import { Container } from './styles';

import { FiLock, FiMoreHorizontal } from 'react-icons/fi';
import React from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Tag } from 'antd';
import styles from './styles.module.scss';

interface DataType {
  key: React.Key;
  date: string;
  id: string;
  type: React.ReactElement;
  name: string;
  items: number;
  owner: string;
  status: React.ReactElement;
  action: React.ReactElement; 
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Items',
    dataIndex: 'items',
  },
  {
    title: 'Owner',
    dataIndex: 'owner',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },

];

const data: DataType[] = [
  {
    key: "1",
    date: "14/01/2019",
    id: "123456789",
    type: <FiLock />,
    name: "Collection 1",
    items: 100,
    owner: "Ramon Ridwan",
    status: <><div><p>Active</p></div></>,
    action: <FiMoreHorizontal />, 
  },
];

export function CollectionCheckBox() {

return <>
    <Container> 
        <div>
          <Checkbox className={styles.checkbox} />
        </div>

        <div>
          <FiLock />
        </div> 

        <div>
          <p>Collection 1 Collection 1 Collection 1 Collection 1Collection 1 Collection 1</p>
        </div>

        <div>
          <p>100</p>
        </div>

        <div>
          <p>14/01/2019</p>
        </div>

        <div>
          <p>Ramon Ridwan</p>
        </div>
     
    </Container >

</>
}