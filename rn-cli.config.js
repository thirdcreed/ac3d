// const blacklist = require('metro-config/src/defaults/blacklist')
const defaultAssetExts = require('metro-config/src/defaults/defaults').assetExts
// const defaultSourceExts = require('metro-config/src/defaults/defaults').sourceExts

module.exports = {
    resetCache: true,
    resolver: {
        // blacklistRE: blacklist([/three\/shaders\/floor\/.*/]),
        assetExts: [
            ...defaultAssetExts, // <- array spreading defaults
            'glsl'
        ]
        // sourceExts: [...defaultSourceExts, 'js.native']
    }
}
