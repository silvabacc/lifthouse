import { StyleSheet } from "react-native";
import { spacing } from "../../../style/sizes";
import { colors } from "../../../style/colors";

const style = StyleSheet.create({
  modal_container: {
    backgroundColor: colors.page,
    borderRadius: spacing.small,
    margin: spacing.large,
  },

  inputs_container: {
    margin: spacing.largest,
  },

  input: {
    backgroundColor: colors.page,
  },

  input_text: {
    marginTop: spacing.largest,
  },

  add_button: {
    marginTop: spacing.largest,
  },
});

export default style;
