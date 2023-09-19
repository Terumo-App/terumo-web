import { InboxOutlined, FileImageOutlined } from "@ant-design/icons";
import { Upload, UploadProps, message, Tabs } from "antd";
import {
  Content,
  Container,
  ContainerUrlLoader,
  SearchContainer,
} from "../styles";
import { NewQueryContext } from "../../../hooks/NewQueryContext";
import { useContext } from "react";
import { Input } from "antd";

const { Search } = Input;

const onSearch = (value: string) => console.log(value);

function getBase64(file: File | Blob) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    console.log(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
}

export function ImageUploadStep() {
  const { newQueryData, setImageFile } = useContext(NewQueryContext);

  const { Dragger } = Upload;

  const props: UploadProps = {
    name: "file",
    multiple: false,
    // action: 'https://jsonplaceholder.typicode.com/posts',
    accept: ".png, .jpeg",
    listType: "picture",
    showUploadList: { showPreviewIcon: true },
    progress: {},
    async onChange(info) {
      const { status } = info.file;
      setImageFile(info.file);
      console.log(newQueryData);

      getBase64(info.file.originFileObj as File); // prints the base64 string

      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const tabs = [
    {
      label: "From Computer",
      key: "0",
      children: (
        <Container>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <h3 className="ant-upload-text">Drag and Drop files here</h3>
          </Dragger>
        </Container>
      ),
    },
    {
      label: "Enter URL",
      key: "1",
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

          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <FileImageOutlined />
            </p>
            <h3 className="ant-upload-text">Image preview</h3>
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
