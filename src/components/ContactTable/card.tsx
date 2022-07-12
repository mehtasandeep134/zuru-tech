/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import './style.scss';
import { Row, Col, Table, Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';
import Meta from 'antd/lib/card/Meta';
import { useCard } from './my-context';

const ContactCard = () => {
  const { selectedCard } = useCard() as any;
  return (
    <>
      {console.log(selectedCard, 'selectedRoe')}
      {selectedCard && (
        <Col span={8} key={selectedCard.id}>
          <Card className="ContactCard">
            <Row>
              <Col className="imageCenter">
                <img
                  alt="BetSite"
                  className="betsiteimage"
                  src={
                    'https://e7.pngegg.com/pngimages/246/960/png-clipart-circle-7-logo-illustration-logo-logo-design-round-business-name-slogan-here-advertisement-free-logo-design-template-text.png'
                  }
                  width={200}
                  loading="lazy"
                />
                <EditOutlined style={{ fontSize: '26px' }} />
              </Col>
            </Row>
            <div className="mt-15">
              <Meta title={selectedCard.name} />
              <Text>{selectedCard.title} </Text>
              <div className="mt-15 termsAndConditionText">
                <div> Full name: </div>
                <div>{selectedCard.name}</div>
                <div> Email: </div>
                <div>{selectedCard.name}</div>
                <div> Phone: </div>
                <div> Company: </div>
                <div> Address: </div>
              </div>
            </div>
          </Card>
        </Col>
      )}
    </>
  );
};

export default ContactCard;
