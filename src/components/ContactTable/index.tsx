/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import './style.scss';
import EditableTable from './expandable-table';
import { Card, Row, Col, Table } from 'antd';
import ContactCard from './card';
import { CardProvider } from './my-context';
const { Meta } = Card;

export default function HandicapperCard() {
  return (
    <CardProvider>
      <EditableTable />
      <ContactCard />
    </CardProvider>
  );
}
