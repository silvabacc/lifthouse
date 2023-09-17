import { Typography } from "antd";
import React from "react";
import Card from "./Card";

const { Meta } = Card;
const { Text } = Typography;

interface WorkoutsCardProps {
  title: string;
  image: string;
  onClick?: () => void;
}

const WorkoutsCard: React.FC<WorkoutsCardProps> = ({
  image,
  title,
  onClick,
}) => {
  return (
    <Card
      bordered={false}
      hoverable
      cover={
        <img
          style={{ height: 230, objectFit: "cover" }}
          alt="example"
          src={image}
          onClick={() => onClick && onClick()}
        />
      }
    >
      <Meta description={<Text strong>{title}</Text>} />
    </Card>
  );
};

export default WorkoutsCard;
