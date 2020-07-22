import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/EvilIcons';
import { DrawerActions } from '@react-navigation/native';

import AppText from './AppText'

const AppHeader = ({ navigation, title }) => {
    return (
        <View style={styles.headerContainer}>
            <View>
                <TouchableOpacity style={styles.navBtnContainer} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Icon size={35} color="white" name="navicon" />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end", marginEnd: 10 }}>
                <AppText numberOfLines={1} style={styles.h1}>{title}</AppText>
            </View>
        </View>
    )
}

export default AppHeader

const styles = StyleSheet.create({
    h1: {
        fontSize: 22,
        color: colors.WHITE,
        fontFamily: "Asap-Regular",
        fontWeight: "100"
    },
    headerContainer: {
        zIndex: 10,
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 17,
        backgroundColor: colors.PRIMARY
    },
    muted: {
        color: colors.SECONDARY
    },
    navBtnContainer: {
        marginLeft: 5,
        marginRight: 15
    },
})
