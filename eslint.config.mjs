import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  {
    ignores: [".next/**", "node_modules/**"],
  },
  {
    rules: {
      // Existing localStorage-hydration patterns trip this React 19 rule.
      // Downgraded to a warning while those components are refactored to
      // derive state / use initializers — do not add new violations.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
]);
