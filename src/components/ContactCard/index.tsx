import React, { Card, Tag, Rate, Row, Col, Space, Empty } from 'antd';
import Text from 'antd/lib/typography/Text';
const { Meta } = Card;
import './style.scss';

export interface CardTypes {
  data: any;
}
export default function ContactCard({ data }: CardTypes) {
  return (
    <>
      {data.length > 0 && (
        <Col span={8} key={data[0].id}>
          <Card className="ContactCard">
            <Row>
              <Col className="imageCenter">
                <img
                  alt="BetSite"
                  className="betsiteimage"
                  src={process.env.REACT_APP_API_BASE_IMAGE_URL + data[0]?.siteImage}
                  loading="lazy"
                />
              </Col>
            </Row>
            <div className="mt-15">
              <Meta title={data[0].cardTitle} />
              <div className="mt-15">
                <Space direction="vertical" className="descriptionText">
                  {data[0].isRecommendedOffer && <Tag>RECOMMENDED OFFER</Tag>}
                </Space>
              </div>
              <div className="mt-15 termsAndConditionText">
                <Text>{data[0].termsAndConditions}</Text>
              </div>
              <div>
                <Rate disabled value={data[0].rating} />
              </div>
            </div>
          </Card>
        </Col>
      )}
      {data.length === 0 && <Empty />}
    </>
  );
}
