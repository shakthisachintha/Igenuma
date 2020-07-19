import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, Modal, ScrollView } from 'react-native'
import * as Yup from 'yup';


import { AppText, ProfilePicture, PressableIcon, AppButton } from '../components';
import { AppForm, AppFormInput, SubmitButton } from '../components/forms';
import useAuth from '../Services/useAuth';
import colors from '../config/styles/colors';

const nameValidation = Yup.object().shape({
    name: Yup.string().required().min(5).label("Name")
});

const passwordValidation = Yup.object().shape({
    currentPassword: Yup.string().required().label("Current password"),
    newPassword: Yup.string().required().min(6).label("New password"),
    confirmPassword: Yup.string().required().oneOf([Yup.ref('newPassword')], 'Passwords must match').label("Confirm Password")
});

const EditProfileScreen = ({ isVisible = false, setModalVisible }) => {

    const auth = useAuth();
    const [nameLoader, setNameLoader] = useState(false)
    const [passwordLoader, setPasswordLoader] = useState(false)

    const updateName = async ({ name }) => {
        setNameLoader(true);
        await auth.updateUser({ name });
        setNameLoader(false);
    }

    const updatePassword = async ({ currentPassword, newPassword }) => {
        setPasswordLoader(true);
        await auth.changePassword(currentPassword, newPassword)
        setPasswordLoader(false);
    }

    return (
        <Modal onRequestClose={() => setModalVisible(false)} animationType="slide" hardwareAccelerated={true} visible={isVisible} >

            <ScrollView style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                    <View style={{ width: 10 }}>
                        <PressableIcon onPress={() => setModalVisible(false)} name="chevron-left" iconColor="dodgerblue" size={40} />
                    </View>
                    <View style={styles.modalTitleContainer}>
                        <AppText style={styles.modalTitle}>Edit Profile</AppText>
                    </View>
                    <View style={{ width: 10 }}></View>


                </View>
                <View style={styles.modalProfile}>
                    <ProfilePicture user={auth.user} />
                    <AppText style={styles.h2}>{auth.user.name}</AppText>
                    <AppText style={styles.muted}>{auth.user.email}</AppText>
                    <AppText style={styles.userType}>{auth.user.userType}</AppText>
                </View>

                <View style={styles.modalUpdateName}>
                    <AppText style={{ color: colors.SECONDARY, fontSize: 28, marginBottom: 10, fontFamily: "Asap-Regular" }}>Update name</AppText>

                    <AppForm
                        initialValues={{ name: auth.user.name }}
                        validationSchema={nameValidation}
                        onSubmit={updateName}
                    >
                        <AppFormInput
                            name="name"
                            autoCapitalize="words"
                            indicateSymbol={false}
                        />

                        <SubmitButton loading={nameLoader} containerStyle={styles.btnContainer} title="Save" />

                    </AppForm>
                </View>

                <View style={styles.modalUpdateName}>
                    <AppText style={{ color: colors.SECONDARY, fontSize: 28, marginBottom: 10, fontFamily: "Asap-Regular" }}>Change password</AppText>

                    <AppForm
                        initialValues={{ currentPassword: "", newPassword: "", confirmPassword: "" }}
                        validationSchema={passwordValidation}
                        onSubmit={updatePassword}
                    >
                        <AppFormInput
                            name="currentPassword"
                            autoCapitalize="none"
                            secureTextEntry
                            placeholder="Current password"
                            autoCorrect={false}
                            indicateSymbol={false}
                        />
                        <AppFormInput
                            name="newPassword"
                            autoCapitalize="none"
                            secureTextEntry
                            placeholder="New password"
                            autoCorrect={false}
                            indicateSymbol={true}
                        />
                        <AppFormInput
                            name="confirmPassword"
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry
                            placeholder="Confirm password"
                            indicateSymbol={true}
                        />

                        <SubmitButton containerStyle={styles.btnContainer} loading={passwordLoader} title="Change password" />

                    </AppForm>
                </View>
                <AppButton title="Logout" onPress={() => auth.logOutUser()} />
            </ScrollView>
        </Modal>
    )
}

export default EditProfileScreen

const styles = StyleSheet.create({
    btnContainer: {
        backgroundColor: null,
        borderColor: colors.SECONDARY,
        borderWidth: 0.2
    },
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
    },
    modalContainer: {
        flex: 1,
        backgroundColor: colors.PRIMARY,
    },
    modalHeader: {
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 15
    },
    modalProfile: {
        marginVertical: 20
    },
    modalTitle: {
        color: colors.SECONDARY,
        fontFamily: "Asap-Regular",
        fontSize: 20,
    },
    modalTitleContainer: {
        flex: 1,
        alignSelf: "center",
        alignItems: "center"
    },
    modalUpdateName: {
        padding: 15,
        marginBottom: 15
    },
})
