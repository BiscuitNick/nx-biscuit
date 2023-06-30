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
LD_LIBRARY_PATH = /node_modules/canvas/build/Release
```

Without this value, we get the following error:

```
Error: /lib64/libz.so.1: version `ZLIB_1.2.9' not found (required by /vercel/path0/node_modules/canvas/build/Release/libpng16.so.16)
```

### 0.0.12

New deployments and redeploys of successful builds is inconsistenly getting this error:
`` Error: /lib64/libc.so.6: version `GLIBC_2.28' not found (required by /vercel/path0/node_modules/canvas/build/Release/libglib-2.0.so.0) ``

Works in Vercel if setting Node to 16.x.x. However, this version is being depracated in the comming months so another solution may be needed.

This all appears related to the Canvas package.

### 0.0.17

Update Type definitions
Add env.example.
Add SENDGRID_API_KEY and integration for Contact form.
