import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as React from 'react'

import TabBarIcon from '../components/TabBarIcon'
import SplashScreen from '../screens/SplashScreen'
// import HomeScreen from '../screens/HomeScreen'
import GyroScreen from '../screens/GyroScreen'
import DeviceMotionScreen from '../screens/DeviceMotionScreen'
import LinksScreen from '../screens/LinksScreen'

const BottomTab = createBottomTabNavigator()
const INITIAL_ROUTE_NAME = 'DeviceMotion'

export default function BottomTabNavigator({ navigation, route }) {
    // Set the header title on the parent stack navigator depending on the
    // currently active tab. Learn more in the documentation:
    // https://reactnavigation.org/docs/en/screen-options-resolution.html
    navigation.setOptions({ headerTitle: getHeaderTitle(route) })

    return (
        <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
            <BottomTab.Screen
                name="Splash"
                component={SplashScreen}
                options={{
                    headerShown: false, // ??
                    title: 'Splash',
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} name="md-code-working" />
                    )
                }}
            />
            <BottomTab.Screen
                name="Gyro"
                component={GyroScreen}
                options={{
                    title: 'Gyro Test',
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} name="md-code-working" />
                    )
                }}
            />
            <BottomTab.Screen
                name="DeviceMotion"
                component={DeviceMotionScreen}
                options={{
                    title: 'Device Motion',
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />
                }}
            />
        </BottomTab.Navigator>
    )
}

function getHeaderTitle(route) {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME

    switch (routeName) {
        case 'Splash':
            return 'Welcome to Arcade City'
        case 'Home':
            return 'How to get started'
        case 'Links':
            return 'Links to learn more'
    }
}
