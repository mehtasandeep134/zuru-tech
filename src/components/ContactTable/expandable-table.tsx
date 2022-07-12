/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Input, Table, Button, Popconfirm, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ColumnProps } from 'antd/lib/table';

import Highlighter from 'react-highlight-words';
import 'antd/dist/antd.css';
import { useCard } from './my-context';

interface IMyTableData {
  id: string;
  name: string;
  goals: number;
  assists: number;
  totalCount?: number;
}

const dataSource: IMyTableData[] = [
  {
    id: '1',
    name: 'Mo Salah',
    goals: 24,
    assists: 10,
  },
  {
    id: '2',
    name: 'Bobby Firmino',
    goals: 11,
    assists: 13,
  },
];

const EditableTable: React.FC = () => {
  const [tableData, setTableData] = useState(dataSource);
  const { setSelectedCard } = useCard() as any;
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = React.useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  useEffect(() => {
    // Set totals on initial render
    const newData = [...tableData];
    for (let index = 0; index < tableData.length; index++) {
      setTotal(newData, index);
    }
    setTableData(newData);
  }, []);

  const handleDelete = (key) => {
    setTableData(tableData.filter((item) => item.id !== key));
  };

  const handleModal = (iDD) => {
    const newObj = tableData.find(({ id }) => id === iDD[0]);
    setSelectedCard(newObj);
  };

  const handleAdd = () => {
    // const { dataSource } = tableData;
    const newData = {
      id: '2',
      name: 'Bobby Firmino',
      goals: 11,
      assists: 13,
    };
    setTableData([...tableData, newData]);
  };

  const onInputChange = (key, index) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = [...tableData];
    newData[index][key] = Number(e.target.value);
    setTotal(newData, index);
    setTableData(newData);
  };

  const setTotal = (data, index) => {
    // Set total
    data[index]['totalCount'] = Number(data[index]['goals'] + data[index]['assists']);
  };

  const onConfirm = () => {
    console.log(tableData);
  };

  const columns: ColumnProps<IMyTableData>[] = [
    {
      dataIndex: 'name',
      title: '',
      ...getColumnSearchProps('name'),
    },
    {
      dataIndex: 'goals',
      title: 'Goals',
      render: (text, record, index) => (
        <Input value={text} onChange={onInputChange('goals', index)} />
      ),
      ...getColumnSearchProps('goals'),
    },
    {
      dataIndex: 'assists',
      title: 'Assists',
      render: (text, record, index) => (
        <Input value={text} onChange={onInputChange('assists', index)} />
      ),
      ...getColumnSearchProps('assists'),
    },
    {
      dataIndex: 'totalCount',
      title: 'Total',
      render: (text, _record, _index) => <h4>{text}</h4>,
      ...getColumnSearchProps('totalCount'),
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) =>
        tableData.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const rowSelection = {
    tableData,
    onChange: (tableData) => {
      handleModal(tableData);
    },
  };

  return (
    <div style={{ padding: 20 }}>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={tableData}
        pagination={false}
        rowSelection={rowSelection}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setSelectedCard(record);
            },
          };
        }}
      />
      <div className="action-btn">
        <Button type="primary" onClick={onConfirm}>
          Confirm Changes
        </Button>
      </div>
    </div>
  );
};

export default EditableTable;
