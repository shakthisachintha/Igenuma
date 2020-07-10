import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import * as Yup from 'yup';


import useAuth from '../../Services/useAuth'
import { AppForm, AppFormInput, SubmitButton } from '../../components/forms'
import { AppButton, AppText } from '../../components'
import AppFormRadioButton from '../../components/forms/AppFormRadioButton';
import AppFormCheckbox from '../../components/forms/AppFormCheckbox';
import colors from '../../config/styles/colors'

const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    email: Yup.string().email().required().label("Email address"),
    password: Yup.string().required().min(6).label("Password"),
    userType: Yup.string().required().label('User role'),
    // concent: Yup.boolean().required().oneOf([true], "You should agree here"),
    confirm_password: Yup.string().required().oneOf([Yup.ref('password')], 'Passwords must match')
});


const RegisterScreen = ({ navigation }) => {

    const auth = useAuth()

    return (
        <ScrollView showsVerticalScrollIndicator={false}>

            <View style={styles.formContainer}>
                <View style={styles.headingContainer}>
                    <Text style={styles.h1}>Register</Text>
                </View>

                <AppForm
                    initialValues={{ email: "", password: "", confirm_password: "", userType: "student", concent: false }}
                    validationSchema={validationSchema}
                    onSubmit={auth.registerUser}
                >
                    <AppFormInput
                        autoCapitalize="words"
                        icon="account"
                        name="name"
                        placeholder="Name"
                    />
                    <AppFormInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="email"
                        name="email"
                        placeholder="Email address"
                    />
                    <AppFormInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry
                        indicateSymbol={false}
                        icon="shield"
                        name="password"
                        placeholder="Password"
                    />
                    <AppFormInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry
                        indicateSymbol={true}
                        icon="shield-refresh"
                        name="confirm_password"
                        placeholder="Re-password"
                    />

                    <AppFormRadioButton title="I am a" name="userType" initial="student" buttons={[
                        { label: 'Student', value: 'student' },
                        { label: 'Teacher', value: 'teacher' }
                    ]} />
                    {/* 
                    <AppFormCheckbox
                        name="concent"
                        label="I agree to the Terms of Services and Privacy Policy."
                    /> */}

                    <SubmitButton loading={auth.isLoading} containerStyle={{ marginTop: 15 }} title="Register" />

                </AppForm>

                <View>
                    <AppButton containerStyle={{ backgroundColor: null }} btnTextStyle={{ color: colors.PRIMARY, fontSize: 15, textTransform: null }} title={<AppText style={{ color: colors.SECONDARY }}>Have an account? <AppText style={{ color: colors.PRIMARY }}>Login</AppText> </AppText>} onPress={() => navigation.navigate("Login")} />
                </View>
            </View>
        </ScrollView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({

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
        marginTop: 20,
        paddingHorizontal: 40,
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
