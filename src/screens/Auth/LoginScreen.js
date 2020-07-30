import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import * as Yup from 'yup';

import colors from '../../config/styles/colors'
import images from '../../config/images'
import { AppForm, AppFormInput, SubmitButton } from '../../components/forms'
import { AppButton, AppTextButton, AppText } from '../../components'

import useAuth from '../../Services/useAuth';
import { CommonActions } from '@react-navigation/native';

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required().label("Email address"),
    password: Yup.string().required().min(6).label("Password")
});


const LoginScreen = ({ navigation }) => {

    useEffect(() => {
        navigation.dispatch(state => {
            // Remove the Loading route from the stack
            const routes = state.routes.filter(r => r.name !== 'Splash');

            return CommonActions.reset({
                ...state,
                routes,
                index: routes.length - 1,
            });
        });
    }, [])

    const auth = useAuth()

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.logoContainer}>
                <Image style={styles.image} source={images.LOGO_ICON} />
                <Text style={styles.muted}>Igenuma</Text>
            </View>


            <View style={styles.formContainer}>
                <View style={styles.headingContainer}>
                    <Text style={styles.h1}>Login</Text>
                    <Text style={styles.subHeading}>Hi there! Nice to see you again.</Text>
                </View>

                <AppForm
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={auth.loginUser}
                >
                    <AppFormInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="email"
                        name="email"
                        mode="outlined"
                        placeholder="Email address"
                    />
                    <AppFormInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry
                        indicateSymbol={false}
                        icon="lock"
                        name="password"
                        mode="outlined"
                        placeholder="Password"
                    />

                    <SubmitButton containerStyle={{ marginTop: 20 }} loading={auth.isLoading} title="Login" />
                </AppForm>

                <View style={styles.bottomContainer}>
                    <AppTextButton containerStyle={{ backgroundColor: null }} btnTextStyle={{ color: colors.SECONDARY, fontSize: 15, textTransform: null }} title="Forgot password?" onPress={() => navigation.navigate("ForgotPassword")} />
                    <AppTextButton containerStyle={{ backgroundColor: null }} btnTextStyle={{ color: colors.PRIMARY, fontSize: 15, textTransform: null }} title="Register" onPress={() => navigation.navigate("Register")} />
                </View>

                <View style={{ flex: 1, marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                    <AppText style={{ color: colors.PRIMARY, fontFamily: "Asap-Regular" }}>
                        Designed and Developed By
                </AppText>
                    <AppText style={{ color: colors.PRIMARY, fontFamily: "Asap-SemiBold" }}>
                        Shakthi Sachintha (17001501)
                    </AppText>
                </View>

            </View>



        </ScrollView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    bottomContainer: {
        flex: 1,
        width: "100%",
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    h1: {
        fontFamily: "Asap-SemiBold",
        fontSize: 38,

    },
    headingContainer: {
        marginTop: 15,
        marginBottom: 15
    },
    subHeading: {
        color: colors.SECONDARY,
        fontFamily: "Asap-Regular",
    },
    formContainer: {
        paddingHorizontal: 40
    },
    image: {
        width: 100,
        alignSelf: 'center',
        height: 130,
    },
    muted: {
        marginTop: 5,
        color: colors.SECONDARY,
        fontFamily: "Asap-SemiBold",
        fontSize: 20,
        alignSelf: "center",
    },
    logoContainer: {
        marginTop: 20,
        marginBottom: 10
    }
})
