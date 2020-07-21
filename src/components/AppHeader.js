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
                    <Icon size={30} color="white" name="navicon" />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end", marginEnd: 10 }}>
                <AppText style={styles.h1}>{title}</AppText>
            </View>
        </View>
    )
}

export default AppHeader

const styles = StyleSheet.create({
    h1: {
        fontSize: 28,
        color: colors.WHITE
    },
    headerContainer: {
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 15,
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
