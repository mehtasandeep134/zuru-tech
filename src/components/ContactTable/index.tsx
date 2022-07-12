import React from 'react';
import EditableTable from './expandable-table';
import ContactCard from './card';
import { CardProvider } from './my-context';
import './style.scss';

export default function HandicapperCard() {
  return (
    <CardProvider>
      <div className="container">
        <EditableTable />
        <ContactCard />
      </div>
    </CardProvider>
  );
}
