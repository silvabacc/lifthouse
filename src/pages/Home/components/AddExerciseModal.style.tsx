import { StyleSheet } from "react-native";
import { spacing } from "../../../style/sizes";
import { colors } from "../../../style/colors";

const style = (keyboard: boolean) =>
  StyleSheet.create({
    modal_container: {
      height: keyboard ? "60%" : "40%",
      backgroundColor: colors.page,
      borderRadius: spacing.small,
      margin: spacing.large,
    },

    inputs_container: {
      margin: spacing.largest,
    },

    input: {
      marginTop: spacing.largest,
    },

    add_button: {
      marginTop: spacing.largest,
      color: colors.accent,
    },
  });

export default style;
