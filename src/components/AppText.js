import React from 'react'
import { StyleSheet, Text } from 'react-native'


const AppText = ({ children, style, ...otherProps }) => {
    return (
        <Text {...otherProps} style={[styles.text, style]}>{children}</Text>
    )
}

export default AppText;

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontFamily: 'Asap-SemiBold'
    }
})
