import { StyleSheet } from "react-native";
import { cardColors, colors } from "../../../style/colors";
import { iconSizes, spacing } from "../../../style/sizes";

const style = StyleSheet.create({
  card: {
    marginTop: spacing.large,
    backgroundColor: cardColors[0],
  },

  title: {
    color: colors.default,
  },

  arrow: {
    paddingRight: spacing.large,
  },
});

export default style;
