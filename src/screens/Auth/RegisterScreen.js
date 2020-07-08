import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'

const RegisterScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Register Screen</Text>
            <Button mode="outlined" onPress={() => navigation.navigate("Login")} >Login</Button>
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})
