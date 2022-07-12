/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Input, Table, Button, Popconfirm, Space, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ColumnProps } from 'antd/lib/table';

import { useCard } from './my-context';
import Highlighter from 'react-highlight-words';
import 'antd/dist/antd.css';

interface IMyTableData {
  id: string | number;
  name: string;
  email: string;
  company: string;
  address: string;
  editable?: boolean;
}

const dataSource: IMyTableData[] = [
  {
    id: 1,
    name: 'Mo Salah',
    email: 'MoSalah@gmail.com',
    company: 'Zuru',
    address: '1 west side, New York, USA',
  },
  {
    id: 2,
    name: 'Bobby Firmino',
    email: 'Bobby@gmail.com',
    company: 'BitOnTree',
    address: '2 west sside, Cali USA',
  },
  {
    id: 3,
    name: 'Viral Firmino',
    email: 'Viral@gmail.com',
    company: 'Google',
    address: '3 west sside, Cali USA',
  },
  {
    id: 4,
    name: 'Karan Firmino',
    email: 'Karan@gmail.com',
    company: 'Nasa',
    address: '4 west sside, Cali USA',
  },
];

const EditableTable: React.FC = () => {
  const [tableData, setTableData] = useState(dataSource);
  const { setSelectedCard } = useCard() as any;
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = React.useRef(null);
  const EditableContext = React.createContext(null);

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
    const storedData = JSON.parse(localStorage.getItem('storedData'));
    setTableData(storedData || newData);
  }, []);

  const handleDelete = (key) => {
    const filteredData = tableData.filter((items) => items.id !== key);
    localStorage.setItem('storedData', JSON.stringify(filteredData));
    setTableData(filteredData);
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
      email: 'bobby@gmail.com',
      company: 'Facebook',
      address: 'Cali 4 west side',
    };
    setTableData([...tableData, newData]);
  };

  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = React.useRef(null);
    const form = React.useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };
  const onInputChange = (id, index) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = [...tableData];
    newData[index][id] = Number(e.target.value);
    setTotal(newData, index);
    setTableData(newData);
  };

  const setTotal = (data, index) => {
    // Set total
    data[index]['totalCount'] = Number(data[index]['goals'] + data[index]['assists']);
  };

  const onConfirm = () => {
    localStorage.setItem('storedData', JSON.stringify(tableData));
  };

  const defaultColumns: any = [
    {
      dataIndex: 'name',
      title: 'Name',
      editable: true,
      ...getColumnSearchProps('name'),
    },
    {
      dataIndex: 'company',
      title: 'Company',
      render: (text, record, index) => (
        <Input value={text} onChange={onInputChange('company', index)} />
      ),
      ...getColumnSearchProps('company'),
    },
    {
      dataIndex: 'address',
      title: 'Address',
      render: (text, record, index) => (
        <Input value={text} onChange={onInputChange('address', index)} />
      ),
      ...getColumnSearchProps('address'),
    },
    {
      dataIndex: 'email',
      title: 'Email',
      render: (text, _record, _index) => <h4>{text}</h4>,
      ...getColumnSearchProps('email'),
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
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    console.log(row);
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setTableData(newData);
  };

  const columns = defaultColumns.map((col: any) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div style={{ padding: 20 }}>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add Contact
      </Button>
      <Table
        rowKey="id"
        columns={columns}
        components={components}
        rowClassName={() => 'editable-row'}
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
      <div className="action-btn mt-15">
        <Button type="primary" onClick={onConfirm}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditableTable;
