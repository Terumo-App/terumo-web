import React, { useState, useContext, useEffect } from "react";
import { Space, Table, Tag, Transfer } from "antd";
import type { ColumnsType, TableRowSelection } from "antd/es/table/interface";
import type { TransferItem, TransferProps } from "antd/es/transfer";
import difference from "lodash/difference";
import { LockOutlined, GlobalOutlined, CheckOutlined } from "@ant-design/icons";

import { Content } from "../styles";
import { NewQueryContext } from "../../../hooks/NewQueryContext";

interface TableTransferProps extends TransferProps<DataType> {
  dataSource: DataType[];
  leftColumns: any;
  rightColumns: any;
  selectedTags: any;
  handleChange: any;
}

interface RecordType {
  key: string;
  date: string;
  type: React.ReactElement | string;
  name: string;
  items: number | string;
  owner: string;
}

interface DataType extends TransferItem {
  key: string;
  date: string;
  type: React.ReactElement | string;
  name: string;
  items: number | string;
  owner: string;
}

const tags = ["Public", "Private"];

const mockData: RecordType[] = Array.from({ length: 20 }).map((_, i) => ({
  key: i.toString(),
  name: `Collection ${i + 1}`,
  owner: `Proprietário ${i + 1}`,
  date: "12-27-2023",
  items: `${i + i * i}`,
  type: tags[i % 2],
}));

const leftTableColumns: ColumnsType<DataType> = [
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
];

const rightTableColumns: ColumnsType<DataType> = [
  {
    dataIndex: "name",
    title: "Name",
  },
];

// Customize Table Transfer
const TableTransfer = ({
  leftColumns,
  rightColumns,
  handleChange,
  selectedTags,
  ...restProps
}: TableTransferProps) => (
  <Transfer {...restProps}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === "left" ? leftColumns : rightColumns;

      const rowSelection: TableRowSelection<DataType> = {
        getCheckboxProps: (item) => ({
          disabled: listDisabled || item.disabled,
        }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys as string[], selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key as string, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      const { CheckableTag } = Tag;

      return (
        <>
          {direction === "left" && (
            <div
              style={{
                marginTop: 0,
                marginBottom: 15,
              }}
            >
              <Space size={[0, 8]} wrap>
                {tags.map((tag) => (
                  <CheckableTag
                    key={tag}
                    checked={selectedTags.includes(tag)}
                    onChange={(checked) => handleChange(tag, checked)}
                  >
                    {tag}
                    {selectedTags.includes(tag) && (
                      <CheckOutlined
                        style={{
                          marginLeft: 8,
                        }}
                      />
                    )}
                  </CheckableTag>
                ))}
              </Space>
            </div>
          )}
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredItems}
            size="middle"
            style={{
              pointerEvents: listDisabled ? "none" : undefined,
              minHeight: 350,
            }}
            onRow={({ key, disabled: itemDisabled }) => ({
              onClick: () => {
                if (itemDisabled || listDisabled) return;
                onItemSelect(
                  key as string,
                  !listSelectedKeys.includes(key as string)
                );
              },
            })}
            pagination={{ pageSize: 5 }}
          />
        </>
      );
    }}
  </Transfer>
);

export function CollectionSelectionStep() {
  const { setCollection, newQueryData } = useContext(NewQueryContext);

  const selectedtargetKeys = () => {
    const collections = newQueryData.collections;

    if (!collections) {
      return [];
    }

    return collections.map((item) => {
      return item.key as string;
    });
  };

  const [targetKeys, setTargetKeys] = useState<string[]>(selectedtargetKeys);
  const [selectedTags, setSelectedTags] = useState<string[]>(tags);
  const [data, setData] = useState<RecordType[]>(mockData);

  const onChange = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys);
    console.log(nextTargetKeys);
    const selectedCollections = nextTargetKeys.map((item) => {
      return data[Number(item)];
    });

    setCollection(selectedCollections);
  };

  const filterOption = (inputValue: string, item: RecordType) => {
    return item.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;
  };

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t: string) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    setSelectedTags(nextSelectedTags);

    setData(
      mockData.filter((item) => nextSelectedTags.includes(item.type as string))
    );
  };

  return (
    <Content>
      <h2>Collection selection</h2>

      <TableTransfer
        dataSource={data}
        targetKeys={targetKeys}
        showSearch={true}
        onChange={onChange}
        filterOption={filterOption}
        leftColumns={leftTableColumns}
        rightColumns={rightTableColumns}
        titles={["Available collections", "Selected collections"]}
        pagination={false}
        selectedTags={selectedTags}
        handleChange={handleChange}
      />
    </Content>
  );
}
