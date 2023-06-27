# NxBiscuit

This is a monorepo where I intend to host most of my ongoing projects.

## Apps

### Nick-Dog

Portfolio page to highlight my latest (and favorite) projects.

## Libraries / Packages

### Biscuit-Cards

### Biscuit-UI

### Biscuit-Words

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

Additionally, in the Vercel hosted project settings the following environment variable is set:

```
LD_LIBRARY_PATH=/vercel/path0/node_modules/canvas/build/Release:/var/task/node_modules/canvas/build/Release

or

/var/task/node_modules/canvas/build/Release

```

Without this value, we get the following error:

```
Error: /lib64/libz.so.1: version `ZLIB_1.2.9' not found (required by /vercel/path0/node_modules/canvas/build/Release/libpng16.so.16)
```
