module.exports = {
  devServer: {
    proxy: {
      "/get1": {
        target: "https://bio.torre.co/api/",
        changeOrigin: true,
        pathRewrite: { "^/get1": "" },
      },
      "/get2": {
        target: "https://torre.co/api/",
        changeOrigin: true,
        pathRewrite: { "^/get2": "" },
      },
      "/post": {
        target: "https://search.torre.co",
        changeOrigin: true,
        pathRewrite: { "^/post": "" },
      },
    },
  },
  publicPath: process.env.NODE_ENV === "production" ? "/torre_challenge/" : "/",
};
