import type { ThemeConfig } from "antd";

/**
 * Lifthouse design tokens.
 *
 * Single source of truth for the visual language. Every antd component reads
 * from these tokens via the <ConfigProvider theme={theme}> in
 * src/app/components/antd.tsx — change values here, not with per-component
 * inline style overrides.
 *
 * Tailwind utilities should use the matching CSS variables declared in
 * src/app/globals.css so both systems stay in sync.
 */

const colors = {
  /** Primary brand color — deep "gym iron" indigo */
  primary: "#4f46e5",
  /** Success / PR-hit green */
  success: "#16a34a",
  warning: "#d97706",
  error: "#dc2626",
  /** App background (behind cards/content) */
  bgLayout: "#f5f5f4",
  /** Card / surface background */
  bgContainer: "#ffffff",
  textPrimary: "#1c1917",
  textSecondary: "#78716c",
  border: "#e7e5e4",
} as const;

export const theme: ThemeConfig = {
  token: {
    colorPrimary: colors.primary,
    colorSuccess: colors.success,
    colorWarning: colors.warning,
    colorError: colors.error,
    colorBgLayout: colors.bgLayout,
    colorBgContainer: colors.bgContainer,
    colorText: colors.textPrimary,
    colorTextSecondary: colors.textSecondary,
    colorBorder: colors.border,
    colorBorderSecondary: colors.border,
    borderRadius: 10,
    fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif",
    // Slightly larger controls: this is a mobile-first app used mid-workout,
    // so tap targets should be generous.
    controlHeight: 38,
  },
  components: {
    Layout: {
      headerBg: colors.bgContainer,
      siderBg: colors.bgContainer,
      bodyBg: colors.bgLayout,
    },
    Menu: {
      itemSelectedBg: "#eef2ff",
      itemSelectedColor: colors.primary,
      itemBorderRadius: 8,
      // Light vertical menus draw a border-inline-end divider by default;
      // the sider/content background contrast already separates them.
      activeBarBorderWidth: 0,
    },
    Card: {
      borderRadiusLG: 14,
    },
    Button: {
      fontWeight: 500,
    },
  },
};
