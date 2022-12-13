/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['hpxxxyoxbnfnfwzwymxv.supabase.co', 'cdn.discordapp.com', 'img.icons8.com'],
  },
  i18n: {
    locales: ['fr'],
    defaultLocale: 'fr',
  },

}

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })
// module.exports = withBundleAnalyzer({})

module.exports = nextConfig
