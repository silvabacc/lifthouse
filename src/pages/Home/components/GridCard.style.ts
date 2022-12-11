import { StyleSheet } from 'react-native';
import { spacing, textSizes } from '../../../style/sizes';

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  }
});

export const cardStyle = (cardColor?: string) =>
  StyleSheet.create({
    card: {
      backgroundColor: cardColor,
      width: '48%',
      height: 170,
      marginTop: spacing.medium
    },

    card_title: {
      fontSize: textSizes.h2,
      textAlign: 'center'
    },

    card_icon: {
      backgroundColor: 'transparent',
      height: 120
    }
  });

export default style;
