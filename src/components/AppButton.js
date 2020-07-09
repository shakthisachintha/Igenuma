import React from 'react'
import { TouchableOpacity, StyleSheet, Text, ActivityIndicator } from 'react-native'

import colors from '../config/styles/colors'

const AppButton = ({ title, onPress, loading, disabled, containerStyle, btnTextStyle }) => {
    return (
        <TouchableOpacity activeOpacity={0.85} disabled={disabled} style={[styles.button, containerStyle]} onPress={onPress}>
            {loading && <ActivityIndicator style={{ marginHorizontal: 15 }} size="small" color={colors.SUCCESS} />}
            <Text style={[styles.btnText, btnTextStyle]}>{title}</Text>
        </TouchableOpacity>
    )
}

export default AppButton

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        backgroundColor: "black",
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: "center",
        padding: 15,
        marginVertical: 10,
    },
    btnText: {
        color: colors.WHITE,
        fontWeight: 'bold',
        textTransform: "uppercase",
        fontSize: 18
    }
})
