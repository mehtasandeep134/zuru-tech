/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Table } from 'antd';
import './style.scss';
import { CardTypes } from 'components/ContactCard';

export default function HandicapperCard({ data }: CardTypes) {
  const [selectedRows, setSelectedRows] = useState(data);
  const dataSource = Object.freeze([
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  const rowSelection = {
    selectedRows,
    onChange: (selectedRows) => {
      setSelectedRows({ selectedRows });
    },
  };

  return <Table dataSource={dataSource} columns={columns} rowSelection={rowSelection} />;
}
