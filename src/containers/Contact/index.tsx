import React, { useState } from 'react';
import { Card } from 'antd';
import ContactCard from 'components/ContactCard';
import ContactTable from 'components/ContactTable';
const cardData = [
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
];

export const Contact = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState(cardData);

  return (
    <>
      <Card bordered={false}>
        <div>
          <ContactTable data={data} />
        </div>
        <div>
          <ContactCard data={data} />
        </div>
      </Card>
    </>
  );
};

export default Contact;
