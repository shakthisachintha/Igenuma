import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import DashboardScreen from '../screens/DashboardScreen';

const Stack = createStackNavigator();

const DashboardNavigator = () => (

    <Stack.Navigator>

        <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ headerShown: false }}
        />

    </Stack.Navigator>
)

export default DashboardNavigator;