const path = require("path");

require("dotenv").config();

module.exports = {
  exportTrailingSlash: true,
  assetPrefix: process.env.ROOT_PREFIX,

  webpack(config, options) {
    config.resolve = {
      alias: {
        "@src": path.join(__dirname, "src"),
        "@components": path.join(__dirname, "src", "components"),
        "@core": path.join(__dirname, "src", "core"),
        "@api": path.join(__dirname, "src", "core", "api"),
        "@config": path.join(__dirname, "src", "core", "config"),
        "@service": path.join(__dirname, "src", "core", "service"),
        "@util": path.join(__dirname, "src", "core", "util"),
        "@hooks": path.join(__dirname, "src", "hooks"),
        "@models": path.join(__dirname, "src", "models"),
        "@pages": path.join(__dirname, "src", "pages"),
        "@store": path.join(__dirname, "src", "store"),
        "@styles": path.join(__dirname, "src", "styles")
      },
      ...config.resolve
    };

    return config;
  },
  env: {
    RUNTIME_ENV: process.env.RUNTIME_ENV,
    APP_API_URL: process.env.APP_API_URL
  }
};
