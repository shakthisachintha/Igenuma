import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'

const LoginScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Login Screen</Text>
            <Button mode="contained" onPress={() => navigation.navigate("Register")} >Register</Button>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})
