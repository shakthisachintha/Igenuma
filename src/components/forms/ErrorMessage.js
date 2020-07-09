import React from 'react'
import { StyleSheet } from 'react-native'
import AppText from '../AppText'
import colors from '../../config/styles/colors';

const ErrorMessage = ({ error, style, visible = true }) => {
    if (!error) return null;
    return (
        <>
            {visible && <AppText style={[styles.error, style]}>{error}</AppText>}
        </>
    )
}

export default ErrorMessage

const styles = StyleSheet.create({
    error: {
        color: colors.DANGER,
        fontSize: 15,
        fontFamily: "Asap-Regular"
    }
})
