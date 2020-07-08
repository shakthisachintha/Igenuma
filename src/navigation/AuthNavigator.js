import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import { LoginScreen, RegisterScreen } from '../screens/Auth';

const Stack = createStackNavigator();

const AuthNavigator = () => (

    <Stack.Navigator>

        <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
        />

        <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
                headerShown: false,
            }}
        />

    </Stack.Navigator>
)

export default AuthNavigator;