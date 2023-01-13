const withOffline = require("next-offline");

const nextConfig = {
  target: "serverless",
  experimental : {
    images : {
      unoptimized: true,
    }
  },

  transformManifest: (manifest) => ["/"].concat(manifest), // - add the homepage to the cache

  generateInDevMode: true,
  

  workboxOpts: {
    swDest: "static/service-worker.js",
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "https-calls",
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60, // - 1 month. Change if want.
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },

  // - @shreesh de-comment only for prod.
  // For <Icon /> support:
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.svg$/,
      loader: "raw-loader",
    });
    return config;
  },
};

module.exports = withOffline(nextConfig);
