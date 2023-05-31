const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      components: path.resolve(__dirname, "src", "components"),
      lib: path.resolve(__dirname, "lib"),
      pages: path.resolve(__dirname, "pages"),
      assets: path.resolve(__dirname, "assets"),
      types: path.resolve(__dirname, "types"),
    },
  },
};
