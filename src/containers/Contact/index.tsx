import React, { useState } from 'react';
import { Card } from 'antd';
import BetCard from 'components/ContactCard';
const cardData = [
  {
    cardTitle: 'test 2 x $10 Free Bets - No Deposit Required',
    termsandconditions: "T&C's apply. NJ, PA, WV, CO, IN, IL, VA, IA, TN residents only. 21+.",
    isRecommendedOffer: true,
    rating: 5,
    siteImage: '46491fab-9df6-4533-8fa2-9f3e78dfb513.png',
    id: '6082f82dadf18c211821b544',
  },
  {
    cardTitle: 'test Risk Free Bet Up To $1000',
    termsandconditions: "T&C's apply. NJ, PA, WV, CO, IN, IL, VA, IA, TN residents only. 21+.",
    isRecommendedOffer: false,
    rating: 2,
    siteImage: '663ecbe4-a73e-4eee-a12f-9de612dc986c.png',
    id: '60ab34a7ac2f862f68ff4762',
  },
];

export const Contact = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState(cardData);

  return (
    <div>
      <Card className="main-content" bordered={false}>
        <BetCard data={data} />
      </Card>
    </div>
  );
};

export default Contact;
