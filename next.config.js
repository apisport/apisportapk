const withPWA = require('next-pwa')({
    dest: 'public',
    disable: false,
    register: true,
    scope: '/app',
    // sw: 'service-worker.js',
    //...
})

module.exports = withPWA({
    // next.js config
})