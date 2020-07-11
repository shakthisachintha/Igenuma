import React from 'react'
import { Image, StyleSheet, TouchableWithoutFeedback, View, Button } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList, DrawerItem
} from "@react-navigation/drawer"

import images from '../config/images';
import { AppText, AppIcon, AppButton } from '../components';
import colors from '../config/styles/colors';

import useAuth from '../Services/useAuth'

const DrawerHeader = ({ navigation }) => {
    const auth = useAuth();
    return (
        <View style={styles.header}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={images.TEACHER_IMAGE} />
            </View>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Dashboard')}>
                <View>
                    <AppText style={styles.h2}>{auth.user.name}</AppText>
                    <AppText style={styles.muted}>{auth.user.email}</AppText>
                    <AppText style={styles.userType}>{auth.user.userType}</AppText>
                </View>
            </TouchableWithoutFeedback>

        </View>
    )
}

export default DrawerHeader

const styles = StyleSheet.create({
    h2: {
        fontFamily: "Asap-Medium",
        fontSize: 22,
        alignSelf: "center",
        color: colors.WHITE
    },
    header: {
        marginBottom: 35,
    },

    image: {
        width: 100,
        alignSelf: 'center',
        height: 100,
        borderRadius: 50,

    },
    imageContainer: {
        marginBottom: 15,
    },
    muted: {
        marginTop: 1,
        color: colors.SECONDARY,
        fontFamily: "Asap-Regular",
        fontSize: 15,
        alignSelf: "center"
    },
    userType: {
        color: "dodgerblue",
        fontSize: 18,
        alignSelf: "center",
        textTransform: "capitalize"
    }

})