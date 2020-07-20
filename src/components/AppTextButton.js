import React from 'react'
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../config/styles/colors'

const AppTextButton = ({ title, onPress, icon = { color: null, name: null, size: 14 }, loading = false, containerStyle, btnTextStyle }) => {
    return (
        <TouchableOpacity activeOpacity={0.85} disabled={loading} style={[{ ...styles.button }, containerStyle]} onPress={onPress}>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                {icon && <Icon name={icon.name} color={icon.color} style={{ marginRight: 5 }} size={icon.size} />}

                <Text style={[styles.btnText, btnTextStyle]}>{title}</Text>
            </View>

        </TouchableOpacity>
    )
}

export default AppTextButton

const styles = StyleSheet.create({
    button: {
        padding: 15,
        marginVertical: 10,
    },

    btnText: {
        color: colors.PRIMARY,
        fontFamily: "Asap-Regular",
        // fontWeight: 'normal',/
        textTransform: "uppercase",
        fontSize: 18
    }
})
