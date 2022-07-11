/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import './style.scss';
import { Card, Row, Col, Table } from 'antd';
import Text from 'antd/lib/typography/Text';
const { Meta } = Card;

export default function HandicapperCard({ data }: any) {
  const [selectedRows, setSelectedRows] = useState(data);
  const dataSource = Object.freeze([
    {
      fullName: 'Deposit Required',
      title: 'Product manager',
      email: "T&C's apply. NJ, PA, WV, CO, IN, IL, VA, IA, TN residents only. 21+.",
      phone: true,
      company: 5,
      address: '46491fab-9df6-4533-8fa2-9f3e78dfb513.png',
      id: '6082f82dadf18c211821b554',
    },
    {
      fullName: 'Deposit Required',
      Email: "T&C's apply. NJ, PA, WV, CO, IN, IL, VA, IA, TN residents only. 21+.",
      title: 'Product manager',
      phone: true,
      company: 5,
      address: '46491fab-9df6-4533-8fa2-9f3e78dfb513.png',
      id: '6082f82dadf18c211821b544',
    },
  ]);

  const columns = [
    {
      title: 'Full name',
      dataIndex: 'fullName',
      key: 'fullName',
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

  const Expander = (props) => <span>Test expander</span>;

  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        expandedRowRender={(row) => <Expander />}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setSelectedRows(record);
            },
          };
        }}
        rowSelection={rowSelection}
      />

      {selectedRows && (
        <Col span={8} key={selectedRows.id}>
          {console.log(selectedRows)}
          <Card className="ContactCard">
            <Row>
              <Col className="imageCenter">
                <img
                  alt="BetSite"
                  className="betsiteimage"
                  src={
                    'https://e7.pngegg.com/pngimages/246/960/png-clipart-circle-7-logo-illustration-logo-logo-design-round-business-name-slogan-here-advertisement-free-logo-design-template-text.png'
                  }
                  loading="lazy"
                />
              </Col>
            </Row>
            <div className="mt-15">
              <Meta title={selectedRows.fullName} />
              <Text>{selectedRows.title} </Text>
              <div className="mt-15 termsAndConditionText">
                <div> Full name: {selectedRows.fullName}</div>
                <div> Email: {selectedRows.email}</div>
                <div> Phone: {selectedRows.phone}</div>
                <div> Company: {selectedRows.company}</div>
                <div> Address: {selectedRows.address}</div>
              </div>
            </div>
          </Card>
        </Col>
      )}
    </>
  );
}
