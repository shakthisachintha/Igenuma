import React from 'react'
import { TouchableOpacity, StyleSheet, Text, ActivityIndicator } from 'react-native'

import colors from '../config/styles/colors'

const AppButton = ({ title, onPress, loading = false, containerStyle, btnTextStyle }) => {
    const bgColor = !loading ? "black" : "#292929"
    return (
        <TouchableOpacity activeOpacity={0.85} disabled={loading} style={[{ ...styles.button, backgroundColor: bgColor }, containerStyle]} onPress={onPress}>
            {loading && <ActivityIndicator style={{ marginHorizontal: 15 }} size="small" color={colors.SUCCESS} />}

            <Text style={[styles.btnText, btnTextStyle]}>{title}</Text>
        </TouchableOpacity>
    )
}

export default AppButton

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        // backgroundColor: '#252525',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: "center",
        padding: 15,
        marginVertical: 10,
    },
    btnText: {
        color: colors.WHITE,
        fontFamily: "Asap-Regular",
        // fontWeight: 'normal',/
        textTransform: "uppercase",
        fontSize: 18
    }
})
