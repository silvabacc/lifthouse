import { Card, Typography } from "antd";
import React from "react";
import styles from "./WorkoutCard.module.scss";

const { Meta } = Card;
const { Text } = Typography;

interface WorkoutsCardProps {
  title: string;
  image: string;
}

const WorkoutsCard: React.FC<WorkoutsCardProps> = ({ image, title }) => {
  return (
    <Card
      bordered={false}
      hoverable
      className={styles.WorkoutCard}
      cover={<img alt="example" src={image} />}
    >
      <Meta description={<Text strong>{title}</Text>} />
    </Card>
  );
};

export default WorkoutsCard;
