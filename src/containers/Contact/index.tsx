import React from 'react';
import { Card } from 'antd';
import ContactTable from 'components/ContactTable';

export const Contact = () => {
  return (
    <>
      <Card bordered={false}>
        <div>
          <ContactTable />
        </div>
      </Card>
    </>
  );
};

export default Contact;
