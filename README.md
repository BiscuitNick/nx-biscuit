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
LD_LIBRARY_PATH = /node_modules/canvas/build/Release


```

Without this value, we get the following error:

```
Error: /lib64/libz.so.1: version `ZLIB_1.2.9' not found (required by /vercel/path0/node_modules/canvas/build/Release/libpng16.so.16)
```

### 0.0.12

Works in Vercel if setting Node to 16.x.x. However, this version is being depracated in the comming months.

Removing canvas from package.json and reattempting Node 18.x.x.

###

Weird behavior is persisting. Is something caching?

Redeploy of successful builds now fail. Getting this error:
`` Error: /lib64/libc.so.6: version `GLIBC_2.28' not found (required by /vercel/path0/node_modules/canvas/build/Release/libglib-2.0.so.0) ``

Testing push of superficial change.

- Pushing change to only this readme file works.

###

This is a reverse of an earlier issue, where a new deployment would fail and subsequent redeploy would succeed.
This is weird.

- If we check the box to reuse cache it works ??
  this appears to be the case

- If we don't check the box it doesn't work???
  yes, so far.

- Is it something to do with the props for this?
  Removing props BiscuitCanvas -- Maybe we were getting an undefined here?

https://nextjs.org/docs/messages/prerender-error
