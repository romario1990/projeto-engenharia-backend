module.exports = function (api) {
  api.cache(true);

  const presets = ["@babel/preset-env"];

  const plugins = [
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-transform-runtime",
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          Src: "./src",
          Helpers: "./src/helpers",
          Dao: "./src/dao",
        },
      },
    ],
  ];
  const ignore = [
    "./yarn.lock",
    "./package-lock.json",
    "**/node_modules",
    "./*.log",
    "./doc",
  ];

  return {
    presets,
    plugins,
    ignore,
  };
};
