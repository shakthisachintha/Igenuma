import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNetInfo } from '@react-native-community/netinfo';

import colors from '../config/styles/colors'

const OfflineNotice = () => {
    const netInfo = useNetInfo();
    if (netInfo.type != "unknown" && netInfo.isInternetReachable === false)
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    No Internet Connection
            </Text>
            </View>
        )
    return null
}

export default OfflineNotice

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.DANGER,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 50,
        zIndex: 10
    },
    text: {
        color: colors.WHITE,
        fontFamily: "Asap-Regular",
        fontSize: 16
    }
})
