// const { PHASE_PRODUCTION_BUILD } = require('next/constants')
const withPWA = require('next-pwa')
const runtimeCaching = require("next-pwa/cache")

module.exports = () => {

  // const isProd = phase === PHASE_PRODUCTION_BUILD

  return withPWA({
    pwa: { dest: 'public',
    runtimeCaching,
    buildExcludes: [/middleware-manifest\.json$/]
  },
    // images: {
    //   domains: ['*']
    // }
  })
}