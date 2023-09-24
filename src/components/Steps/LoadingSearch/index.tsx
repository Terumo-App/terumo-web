import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { Content } from "../styles";

type LoadingSearchStepType = {
  message?: string;
}

export function LoadingSearchStep({ message }: LoadingSearchStepType) {
  const antIcon = <LoadingOutlined style={{ fontSize: 200, color:  '#A33B4E' }} spin />;

  return (
    <Content>
      {message && <h2>{message}</h2>} 
      <Spin style={{ marginTop: 70 }} indicator={antIcon} />
    </Content>
  );
}
