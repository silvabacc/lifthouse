import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { spacing, textSizes } from "./sizes";

export const textStyle = StyleSheet.create({
  h1: { fontSize: textSizes.h1, color: colors.default },
  h2: { fontSize: textSizes.h2, color: colors.default },
  h3: { fontSize: textSizes.h3, color: colors.default },
});

export const pageStyle = StyleSheet.create({
  body: { margin: spacing.large },
});
