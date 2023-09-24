import { Card, Col, Row, Typography } from "antd";
import React from "react";
import { HomeCardConfig } from "./cardsConfig";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const { Text } = Typography;

interface HomeCardsProps {
  cardConfig: HomeCardConfig[];
}

export const HomeCards: React.FC<HomeCardsProps> = ({ cardConfig }) => {
  const navigate = useNavigate();

  return (
    <Row gutter={6}>
      {cardConfig.map((card) => (
        <Col xs={24} sm={6} key={card.title}>
          <Card
            bordered={false}
            hoverable
            cover={
              <img
                style={{ height: 230, objectFit: "cover" }}
                alt="example"
                src={card.image}
                onClick={() => navigate(card.route)}
              />
            }
            onClick={() => navigate(card.route)}
          >
            <Meta description={<Text strong>{card.title}</Text>} />
          </Card>
        </Col>
      ))}
    </Row>
  );
};
