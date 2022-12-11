import React from 'react';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../../style/colors';
import { iconSizes } from '../../../style/sizes';
import style from './TodayCard.style';

const TodayCard: React.FC = () => (
  <Card style={style.card}>
    <Card.Title
      title="Today is Upper Intensity"
      titleStyle={style.title}
      rightStyle={style.arrow}
      right={() => (
        <Icon
          name="arrow-right"
          size={iconSizes.standard}
          color={colors.default}
        />
      )}
    />
  </Card>
);

export default TodayCard;
