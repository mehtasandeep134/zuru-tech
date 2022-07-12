import React from 'react';
import { Col, Card, Avatar } from 'antd';
import Text from 'antd/lib/typography/Text';
import Meta from 'antd/lib/card/Meta';
import { avatarCapsProviders } from 'utils/helper';
import { useCard } from './my-context';
import './style.scss';

const ContactCard = () => {
  const { selectedCard } = useCard() as any;
  return (
    <>
      {selectedCard && (
        <Col xs={12} lg={8} key={selectedCard.id}>
          <Card className="contactCard">
            <div className="avatar">
              <Avatar className="avatar-name" size="large">
                {avatarCapsProviders(selectedCard?.name) || 'Zuru'}
              </Avatar>
            </div>
            <div className="mt-15">
              <Meta className="mt-15" title={selectedCard.name} />
              <Text>{selectedCard.title} </Text>
              <div className="mt-15 termsAndConditionText">
                <div className="container-align">
                  Full name: <div>{selectedCard.name ?? 'Zuru'}</div>
                </div>
                <div className="container-align">
                  Email:
                  <div>{selectedCard.name ?? 'zuru@gmail.com'}</div>
                </div>
                <div className="container-align">
                  Company: <div>{selectedCard?.company ?? 'Zuru'}</div>{' '}
                </div>
                <div className="container-align">
                  {' '}
                  Address: <div>{selectedCard?.address ?? 'Shyamal cross road'}</div>{' '}
                </div>
              </div>
            </div>
          </Card>
        </Col>
      )}
    </>
  );
};

export default ContactCard;
