import * as Linking from 'expo-linking'

export default {
    prefixes: [Linking.makeUrl('/')],
    config: {
        Root: {
            path: '/',
            screens: {
                Splash: 'splash',
                Home: 'home',
                Links: 'links'
            }
        }
    }
}
