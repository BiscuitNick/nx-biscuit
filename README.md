# NxBiscuit

This is a monorepo where I intend to host most of my ongoing projects.

## Apps

## Libraries

## Build Notes

### 0.0.11

The following was added to the next.config.js file to resolve unexpected build issues when deploying to Vercel:

```
const nextConfig = {
  ...
  webpack: (config) => {
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

    config.externals.push({
      sharp: 'commonjs sharp',
      canvas: 'commonjs canvas',
    });
    return config;
  },
  experimental: {
    legacyBrowsers: false,
    outputFileTracingIgnores: ['**canvas**'],
  },
};
```

Additionally, in the project settings the following environment variable is set:

```
LD_LIBRARY_PATH = /var/task/node_modules/canvas/build/Release
```
