import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { AppButton } from '../../components'
import useAuth from '../../Services/useAuth'


const DashboardScreen = () => {

    return (
        <View>
            <Text>Dashboard Screen</Text>
            <AppButton onPress={useAuth().logOutUser} title="Logout" />
        </View>
    )
}

export default DashboardScreen

const styles = StyleSheet.create({})
