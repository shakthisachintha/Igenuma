import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppButton } from '../../components'


const RegisterScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Register Screen</Text>
            <AppButton title="Login" onPress={() => navigation.navigate("Login")} />
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})
