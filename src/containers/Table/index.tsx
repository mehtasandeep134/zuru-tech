import React, { useState } from 'react';
import { Card } from 'antd';
import HandicapperCard from 'components/ContactTable';

export const ContactDetails = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState();

  return (
    <div>
      <Card className="main-content" bordered={false}>
        <HandicapperCard data={data} />
      </Card>
    </div>
  );
};

export default ContactDetails;
