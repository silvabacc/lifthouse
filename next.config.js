/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    // Strip console.* (except errors/warnings) from production bundles
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
  // React Compiler: automatic memoization — components skip re-rendering
  // when their inputs haven't changed, without manual memo/useMemo/useCallback
  reactCompiler: true,
  experimental: {
    // Rewrite barrel imports to direct file imports so only the components
    // actually used are bundled and compiled
    optimizePackageImports: ["antd", "@ant-design/icons", "@ant-design/plots"],
  },
};

module.exports = nextConfig;
