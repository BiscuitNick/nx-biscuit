//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const webpack = require('webpack');
const { composePlugins, withNx } = require('@nx/next');
const withMDX = require('@next/mdx')();

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (
      process.env.LD_LIBRARY_PATH == null ||
      !process.env.LD_LIBRARY_PATH.includes(
        `${process.env.PWD}/node_modules/canvas/build/Release:`
      )
    ) {
      process.env.LD_LIBRARY_PATH = `${
        process.env.PWD
      }/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ''}`;
    }
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    config.resolve.fallback = {
      process: require.resolve('process/browser'),
      zlib: require.resolve('browserify-zlib'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util'),
      buffer: require.resolve('buffer'),
      asset: require.resolve('assert'),
    };
    config.externals.push({
      sharp: 'commonjs sharp',
      canvas: 'commonjs canvas',
    });
    config.plugins.push(
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        // process: 'process/browser',
      })
    );
    return config;
  },
  experimental: {
    legacyBrowsers: false,
    outputFileTracingIgnores: ['**canvas**'],
    mdxRs: true,
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
  withMDX,
];

module.exports = composePlugins(...plugins)(nextConfig);
