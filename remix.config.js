/** @type {import('@remix-run/dev').AppConfig} */
const config = {
  future: {
    v3_routeConvention: true
  },
  ignoredRouteFiles: ["**/.*"],
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildPath: "build/index.js",
  serverModuleFormat: "cjs"
};

export default config;
