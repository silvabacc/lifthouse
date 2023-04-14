import { Card } from "antd";
import React from "react";
import styles from "./WorkoutCard.module.scss";

const { Meta } = Card;

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
      <Meta
        description={
          <div className={styles.WorkoutCard__Description}>{title}</div>
        }
      />
    </Card>
  );
};

export default WorkoutsCard;
