import { View } from "./components/logVisuals/types";

export function getButtonType(currentView: View, targetView: View) {
  return currentView === targetView ? "link" : "text";
}
