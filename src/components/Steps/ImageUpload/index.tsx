import { InboxOutlined } from '@ant-design/icons';
import { Upload, UploadProps, message } from 'antd';
import { Content, Container } from '../styles';
import { NewQueryContext } from '../../../hooks/NewQueryContext';
import { useContext } from 'react';


export function ImageUploadStep() {
  const { setImageFile } = useContext(NewQueryContext);

  const { Dragger } = Upload;

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    action: 'http://localhost:5000/search-service/upload-query-image',
    accept: '.png, .jpeg',
    listType: 'picture',
    showUploadList: { showPreviewIcon: true },
    progress: {},
    onChange(info) {
      const { status } = info.file;
       
      
      if (status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        console.log(info.file.response);
        setImageFile(info.file.response);
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
  };

  return (
    <Content>
      <h2>Image upload</h2>

      <Container>
        <Dragger {...props} >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <h3 className="ant-upload-text">Drag and Drop files here</h3>
      </Dragger>
      </Container>
      
    </Content>
  );
}
