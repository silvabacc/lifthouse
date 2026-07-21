/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        primary: "var(--color-primary)",
        "text-secondary": "var(--color-text-secondary)",
      },
    },
  },
  plugins: [],
  corePlugins: {
    // antd provides its own reset; Tailwind preflight would fight it
    preflight: false,
  },
};
