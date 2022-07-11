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
        <Row gutter={18}>
          {data?.map((obj: any) => (
            <Col span={8} key={obj.id}>
              <Card className="ContactCard">
                <Row>
                  <Col className="imageCenter">
                    <img
                      alt="BetSite"
                      className="betsiteimage"
                      src={process.env.REACT_APP_API_BASE_IMAGE_URL + obj?.siteImage}
                      loading="lazy"
                    />
                  </Col>
                </Row>
                <div className="mt-15">
                  <Meta title={obj.cardTitle} />
                  <div className="mt-15">
                    <Space direction="vertical" className="descriptionText">
                      {obj.isRecommendedOffer && <Tag>RECOMMENDED OFFER</Tag>}
                    </Space>
                  </div>
                  <div className="mt-15 termsAndConditionText">
                    <Text>{obj.termsAndConditions}</Text>
                  </div>
                  <div>
                    <Rate disabled value={obj.rating} />
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      {data.length === 0 && <Empty />}
    </>
  );
}
