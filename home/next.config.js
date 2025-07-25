const NextFederationPlugin = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "home",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./ProductCard": "./components/ProductCard",
          "./store": "./store/store",
        },
        remotes: {
          cart: "cart@http://localhost:3001/_next/static/chunks/remoteEntry.js", // cart remote'u tanımlanıyor
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: false,
            eager: true,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: false,
            eager: true,
          },
          "react-redux": {
            singleton: true,
            requiredVersion: false,
            eager: true,
          },
          "@reduxjs/toolkit": {
            singleton: true,
            requiredVersion: false,
            eager: true,
          },
        },
        extraOptions: {
          exposePages: true,
        },
      })
    );

    return config;
  },
  experimental: {
    esmExternals: false,
  },
};

module.exports = nextConfig;
