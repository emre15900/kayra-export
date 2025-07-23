const NextFederationPlugin = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    const { isServer } = options;
    
    config.plugins.push(
      new NextFederationPlugin({
        name: 'cart',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './CartList': './components/CartList',
          './store': './store/store',
        },
        remotes: {
          home: `home@http://localhost:3000/_next/static/chunks/remoteEntry.js`,
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