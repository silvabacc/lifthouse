import { StyleSheet } from "react-native";
import { spacing, textSizes } from "../../../style/sizes";

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});

export const cardStyle = (cardColor?: string) => {
  const cardHeight = 155;

  return StyleSheet.create({
    card: {
      backgroundColor: cardColor,
      width: "48%",
      height: cardHeight,
      marginTop: spacing.medium,
    },

    card_title: {
      fontSize: textSizes.h2,
      textAlign: "center",
    },

    card_icon: {
      backgroundColor: "transparent",
      height: cardHeight - 50,
    },
  });
};

export default style;
