const createExpoWebpackConfigAsync = require('@expo/webpack-config')

module.exports = async function (env, argv) {
    const config = await createExpoWebpackConfigAsync(env, argv)
    // Customize the config before returning it.

    // console.log(config.module.rules)

    // config.module = {
    //     ...config.module,
    //     rules: [
    //         // Shaders
    //         {
    //             test: /\.(glsl|vs|fs|vert|frag)$/,
    //             // exclude: /node_modules/,
    //             // use: ['file-loader']
    //             // use: ['raw-loader', 'glslify-loader']
    //             // use: ['webpack-glsl-loader']
    //         },
    //         ...config.module.rules
    //     ]
    // }

    return config
}
