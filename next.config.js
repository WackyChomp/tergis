/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig

module.exports = {
  images: {
    remotePatterns:[
      {
        protocol: 'https',
        hostname: '*',
      },
      // {
      //   protocol: 'https',
      //   hostname: '',
      // },
      // {
      //   protocol: 'https',
      //   hostname: '',
      //   port: '',
      //   pathname: '',
      // },
    ]
  }
}
