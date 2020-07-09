import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AppText from './AppText';
import colors from '../config/styles/colors';

const AppTextInput = ({ backgroundColor = colors.WHITE, append, icon, ...otherProps }) => {
    return (
        <View style={[styles.container, { backgroundColor }]}>
            {icon && <Icon style={styles.icon} size={20} name={icon} />}
            <TextInput style={[{ flex: 1, color: colors.PRIMARY, }]} {...otherProps} />
            {append}
        </View>
    )
}

export default AppTextInput

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        borderRadius: 25,
        flexDirection: "row",
        width: '100%',
        paddingHorizontal: 15,
        marginVertical: 10,
        borderColor: colors.PRIMARY,
        borderWidth: 0.1,
        opacity: 0.9
    },
    icon: {
        marginRight: 6,
    },
})
