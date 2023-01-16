const path = require("path");

module.exports = {
  // The mode parameter has been given in package.json
  entry: "./build/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  target: "node",
  resolve: {
    alias: {
      "@config": path.resolve(__dirname, "build/config/"),
      "@controllers": path.resolve(__dirname, "build/controllers/"),
      "@dao": path.resolve(__dirname, "build/dao/"),
      "@models": path.resolve(__dirname, "build/models/"),
      "@routes": path.resolve(__dirname, "build/routes/"),
      "@services": path.resolve(__dirname, "build/services/"),
      "@utils": path.resolve(__dirname, "build/utils/"),
    },
  },
};
