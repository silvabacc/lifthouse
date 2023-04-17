import { Card, Typography } from "antd";
import React from "react";
import styles from "./WorkoutCard.module.scss";

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
      className={styles.WorkoutCard}
      bordered={false}
      hoverable
      cover={
        <img alt="example" src={image} onClick={() => onClick && onClick()} />
      }
    >
      <Meta description={<Text strong>{title}</Text>} />
    </Card>
  );
};

export default WorkoutsCard;
