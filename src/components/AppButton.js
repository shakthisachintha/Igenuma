import React from 'react'
import { TouchableOpacity, StyleSheet, Text, ActivityIndicator, View } from 'react-native'

import colors from '../config/styles/colors'

const AppButton = ({ title, onPress, disabled = false, loading = false, containerStyle, btnTextStyle }) => {
    const bgColor = !loading ? "black" : "#292929"
    return (
        <TouchableOpacity activeOpacity={0.85} disabled={loading || disabled} style={[{ ...styles.button, backgroundColor: bgColor }, containerStyle]} onPress={onPress}>
            <View style={styles.colLeft} >
            </View>
            <View style={styles.colCenter}>
                <Text style={[styles.btnText, btnTextStyle]}>{title}</Text>
            </View>
            <View style={styles.colRight}>
                {loading && <ActivityIndicator style={{ marginHorizontal: 15 }} size="small" color={colors.SUCCESS} />}
            </View>
        </TouchableOpacity>
    )
}

export default AppButton

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        // backgroundColor: '#252525',
        borderRadius: 25,
        justifyContent: 'space-evenly',
        alignItems: "center",
        padding: 15,
        marginVertical: 10,
    },
    colLeft: {
        width: 0.1,

    },
    colCenter: {
        flex: 1,
        alignItems: "center"
    },
    colRight: {
        width: 0.1,
        alignItems: "flex-end"
    },
    btnText: {
        color: colors.WHITE,
        fontFamily: "Asap-Regular",
        // fontWeight: 'normal',/
        textTransform: "uppercase",
        fontSize: 18
    }
})
