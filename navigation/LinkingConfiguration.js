import * as Linking from 'expo-linking'

export default {
    prefixes: ['/'],
    // prefixes: [Linking.makeUrl('/')],
    config: {
        Root: {
            path: '/',
            screens: {
                Splash: 'splash',
                Gyro: 'gyro',
                DeviceMotion: 'devicemotion'
            }
        }
    }
}
