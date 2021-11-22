module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/da_bus/" : "/",
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/scss/variables.scss"; @import "~@/assets/scss/mixin.scss";`,
      },
    },
  },
};
