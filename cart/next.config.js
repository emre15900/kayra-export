const NextFederationPlugin = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "cart",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./CartList": "./components/CartList",
          "./store": "./store/store",
        },
        remotes: {
          home: "home@http://localhost:3000/_next/static/chunks/remoteEntry.js", // home remote'u tanımlanıyor
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
