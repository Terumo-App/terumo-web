import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { Content } from "../styles";


export function LoadingSearchStep() {
  const antIcon = <LoadingOutlined style={{ fontSize: 200, color:  '#A33B4E' }} spin />;

  return (
    <Content>
      <h2>Loading...</h2>
      <Spin style={{ marginTop: 70 }} indicator={antIcon} />
    </Content>
  );
}
