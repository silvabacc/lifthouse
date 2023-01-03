import { StyleSheet } from "react-native";
import { spacing } from "../../../style/sizes";
import { colors } from "../../../style/colors";

const style = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },

  modal_container: {
    backgroundColor: colors.page,
    borderRadius: spacing.small,
    margin: spacing.large,
    padding: spacing.large,
  },
});

export default style;
