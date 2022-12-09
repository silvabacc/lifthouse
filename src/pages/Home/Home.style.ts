import { StyleSheet } from "react-native";
import { spacing, textSizes } from "../../style/sizes";

const style = StyleSheet.create({
  subTitle: {
    marginTop: spacing.large,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  add_exercise_button: {
    fontSize: textSizes.button,
  },
});

export default style;
