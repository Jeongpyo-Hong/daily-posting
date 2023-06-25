/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      module: false,
    };
    return config;
  },
  compilerOptions: {
    noUnusedLocals: false,
    noUnusedParameters: false,
  },
};

module.exports = nextConfig;
