const nextBuildId = require('next-build-id')

module.exports = {
    reactStrictMode: true,
    generateBuildId: () => nextBuildId({ dir: __dirname }),
}
