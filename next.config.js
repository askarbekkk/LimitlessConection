const withImages = require('next-images');


module.exports = withImages({
    webpack(config, options) {
        return config
    },
    dynamicAssetPrefix: true,
    images: {
        disableStaticImages: true
    },
    env: {
        API_URL: 'https://api.temir.ae/api/v1/',
        BASE_URL: 'https://temir.ae'
    }
});