import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import * as Yup from 'yup';

import colors from '../../config/styles/colors'
import images from '../../config/images'
import { AppForm, AppFormInput, SubmitButton } from '../../components/forms'
import { AppButton } from '../../components'
import { ScrollView } from 'react-native-gesture-handler'
import useAuth from '../../Services/useAuth';

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required().label("Email address"),
    password: Yup.string().required().min(6).label("Password")
});


const LoginScreen = ({ navigation }) => {
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
                    onSubmit={useAuth().loginUser}
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

                    <SubmitButton title="Login" />
                </AppForm>

                <View style={styles.bottomContainer}>
                    <AppButton containerStyle={{ backgroundColor: null }} btnTextStyle={{ color: colors.SECONDARY, fontSize: 15, textTransform: null }} title="Forgot password?" onPress={() => navigation.navigate("Register")} />
                    <AppButton containerStyle={{ backgroundColor: null }} btnTextStyle={{ color: colors.PRIMARY, fontSize: 15, textTransform: null }} title="Register" onPress={() => navigation.navigate("Register")} />
                </View>
            </View>



        </ScrollView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    bottomContainer: {
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
