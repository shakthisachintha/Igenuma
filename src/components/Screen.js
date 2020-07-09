import React from 'react'
import { StyleSheet, View } from 'react-native'
import colors from '../config/styles/colors'


const Screen = ({ children, style }) => {
    return (
        <View style={[styles.screen, style]}>
            {children}
        </View>
    )
}

export default Screen

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "black",
        padding: 5,
        flex: 1
    }
})
