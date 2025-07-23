const NextFederationPlugin = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    const { isServer } = options;
    
    config.plugins.push(
      new NextFederationPlugin({
        name: 'home',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './ProductCard': './components/ProductCard',
          './store': './store/store',
        },
        remotes: {
          cart: `cart@http://localhost:3001/_next/static/chunks/remoteEntry.js`,
        },
        shared: {
          react: { singleton: true, eager: true },
          'react-dom': { singleton: true, eager: true },
          '@reduxjs/toolkit': { singleton: true, eager: true },
          'react-redux': { singleton: true, eager: true },
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