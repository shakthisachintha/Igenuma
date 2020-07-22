import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import { LoginScreen, RegisterScreen, ForgotPassword } from '../screens/Auth';
import { WelcomeScreen } from '../screens';

const Stack = createStackNavigator();

const AuthNavigator = () => (

    <Stack.Navigator>

        <Stack.Screen
            name="Splash"
            component={WelcomeScreen}
            options={{ headerShown: false }}
        />

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
        <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
                headerShown: false,
            }}
        />



    </Stack.Navigator>
)

export default AuthNavigator;