import React, { useState } from 'react'
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';



import { AppText, ProfilePicture, AppButton, AppTextInput, PressableIcon } from '../components';
import colors from '../config/styles/colors';
import useAuth from '../Services/useAuth'
import { EditProfileScreen } from '../screens';


const DrawerHeader = ({ navigation }) => {
    const auth = useAuth();
    const [modalVisible, setModalVisible] = useState(false)
    return (
        <>
            <EditProfileScreen setModalVisible={setModalVisible} isVisible={modalVisible} />
            <View style={styles.header}>
                <ProfilePicture user={auth.user} />
                <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                    <View>
                        <AppText style={styles.h2}>{auth.user.name}</AppText>
                        <AppText style={styles.muted}>{auth.user.email}</AppText>
                        <AppText style={styles.userType}>{auth.user.userType}</AppText>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </>
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