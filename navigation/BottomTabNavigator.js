import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as React from 'react'

import TabBarIcon from '../components/TabBarIcon'
import SplashScreen from '../screens/SplashScreen'
import HomeScreen from '../screens/HomeScreen'
import LinksScreen from '../screens/LinksScreen'

const BottomTab = createBottomTabNavigator()
const INITIAL_ROUTE_NAME = 'Splash'

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
                    title: 'Splashhhh',
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} name="md-code-working" />
                    )
                }}
            />
            <BottomTab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Get Started',
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} name="md-code-working" />
                    )
                }}
            />
            <BottomTab.Screen
                name="Links"
                component={LinksScreen}
                options={{
                    title: 'Resources',
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
