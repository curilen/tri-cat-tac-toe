const { i18n } = require('./next-i18next.config')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  i18n,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/game',
        permanent: true,
      },
    ]
  },
}

module.exports = withBundleAnalyzer(nextConfig)