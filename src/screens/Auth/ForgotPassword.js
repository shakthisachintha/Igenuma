import React, { useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import * as Yup from 'yup';

import colors from '../../config/styles/colors'
import images from '../../config/images'
import { AppForm, AppFormInput, SubmitButton } from '../../components/forms'
import { AppButton, AppTextButton } from '../../components'

import { resetPassword } from '../../Services/User';

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required().label("Email address"),
});


const ForgotPassword = ({ navigation }, { resetForm }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [resetState, setResetState] = useState("send reset link");

    const handleSubmit = async ({ email },) => {
        setIsLoading(true);
        setResetState("sending link");
        await resetPassword(email);
        setIsDisabled(true);
        setIsLoading(false);
        setResetState("Reset link sent");
    }


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.logoContainer}>
                <Image style={styles.image} source={images.LOGO_ICON} />
                <Text style={styles.muted}>Igenuma</Text>
            </View>


            <View style={styles.formContainer}>
                <View style={styles.headingContainer}>
                    <Text style={styles.h1}>Recover password</Text>
                    <Text style={styles.subHeading}>Forgot password? No worries, lets recover</Text>
                </View>

                <AppForm
                    initialValues={{ email: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <AppFormInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="email"
                        name="email"
                        placeholder="Email address"
                    />

                    <SubmitButton disabled={isDisabled} containerStyle={{ marginTop: 20 }} loading={isLoading} title={resetState} />

                </AppForm>

            </View>



        </ScrollView>
    )
}

export default ForgotPassword

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
