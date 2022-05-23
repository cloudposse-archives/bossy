const { merge } = require("webpack-merge");

module.exports = (config, _context) => {
  return merge(config, {
    externals: {
      bufferutil: "bufferutil",
      "utf-8-validate": "utf-8-validate",
    },
  });
};
