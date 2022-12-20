const path = require("path");

module.exports = {
  entry: "./build/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  target: "node",
  resolve: {
    alias: {
      "@routes": path.resolve(__dirname, "build/routes/"),
    },
  },
};
