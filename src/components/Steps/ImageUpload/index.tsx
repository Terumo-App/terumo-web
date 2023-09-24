import { InboxOutlined, FileImageOutlined } from '@ant-design/icons';
import { Upload, UploadProps, message, Tabs } from 'antd';
import {
  Content,
  Container,
  ContainerUrlLoader,
  SearchContainer,
} from '../styles';
import { NewQueryContext } from '../../../hooks/NewQueryContext';
import { useContext, useState } from 'react';
import { Input } from 'antd';
import { getFileFromURL } from '../../../utils/utils';

const { Search } = Input;

export function ImageUploadStep() {
  const { newQueryData, setImageFile } = useContext(NewQueryContext);
  const [file, setFile] = useState<any>();

  const onSearch = async (value: string) => {
    console.log(value);

    const imgFile = await getFileFromURL(value);

    setImageFile(imgFile.file);
    setFile(value);

    // "https://fastly.picsum.photos/id/596/300/300.jpg?hmac=XyxyP0y5jQ2T0pgdg5EeUGKoxn5Y4rlNPj4lwbsvjPg"
    console.log(newQueryData);
  };

  const { Dragger } = Upload;

  const props: UploadProps = {
    disabled: Boolean(file),
    name: 'file',
    multiple: false,
    action: 'https://httpstat.us/200',
    accept: '.png, .jpeg',
    listType: 'picture',
    showUploadList: { showPreviewIcon: true },
    progress: {},
    async onChange(info) {
      const { status } = info.file;
      setImageFile(info.file);
      // console.log(getBase64(info.file.originFileObj as File)); // prints the base64 string

      /*if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }*/
      if (status === 'done') {
        message.success(
          `${info.file.name} file uploaded successfully.`
        );
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    onRemove(file) {
      console.log("Removed file: ", file);
      setImageFile(undefined);
    },
  };

  const tabs = [
    {
      label: 'From Computer',
      key: '0',
      children: (
        <Container>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <h3 className="ant-upload-text">
              Drag and Drop files here
            </h3>
          </Dragger>
        </Container>
      ),
    },
    {
      label: 'Enter URL',
      key: '1',
      children: (
        <ContainerUrlLoader>
          <SearchContainer>
            <Search
              placeholder="Type URL"
              allowClear
              enterButton="Load"
              size="large"
              onSearch={onSearch}
            />
          </SearchContainer>

          <Dragger disabled {...props}>
            {file ? (
              <>
                <img src={file} style={{ width: 550, height: 300 }} />
              </>
            ) : (
              <>
                <p className="ant-upload-drag-icon">
                  <FileImageOutlined />
                </p>
                <h3 className="ant-upload-text">Image preview</h3>
              </>
            )}
          </Dragger>
        </ContainerUrlLoader>
      ),
    },
  ];

  return (
    <Content>
      <h2>Image upload</h2>
      <Tabs defaultActiveKey="0" centered items={tabs} />
    </Content>
  );
}
