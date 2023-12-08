module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.77.222.42.224.nip.io',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'api.77.222.42.224.nip.io',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'electrasharing.shop',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'electrasharing.shop',
        pathname: '**',
      },
    ],
  },
};
