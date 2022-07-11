import React from 'react';
import { Card, Tag, Rate, Row, Col, Space, Empty } from 'antd';
import Text from 'antd/lib/typography/Text';
import { CardTypes } from 'components/ContactCard';
import './style.scss';

const { Meta } = Card;
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
                    />
                  </Col>
                </Row>
                <div className="mt-15">
                  <Meta title={obj.header} />
                  <div className="mt-15">
                    <Space direction="vertical" className="descriptionText">
                      {obj.details?.map((details: any) => (
                        <Tag key={obj.id}>{details}</Tag>
                      ))}
                    </Space>
                  </div>
                  <div className="mt-15 termsAndConditionText">
                    <Text>{obj.termsandconditions}</Text>
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
