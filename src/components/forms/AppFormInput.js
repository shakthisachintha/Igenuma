import React from 'react'
import { StyleSheet, View } from 'react-native'
import ErrorMessage from './ErrorMessage'
import { useFormikContext } from 'formik';
import AppTextInput from '../AppTextInput';
import colors from '../../config/styles/colors';
import AppText from '../AppText';




const AppFormInput = ({ name, indicateSymbol = true, ...otherProps }) => {

    const { setFieldTouched, values, setFieldValue, errors, touched } = useFormikContext();

    const errorSymbol = (touched, error) => {
        if (indicateSymbol) {
            if (!touched) return null;
            if (error) {
                return <AppText style={{ fontWeight: "bold", fontSize: 18, color: colors.DANGER, paddingRight: 10 }}>!</AppText>
            } if (!error) {
                return <AppText style={{ fontWeight: "bold", fontSize: 18, color: colors.SUCCESS, paddingRight: 10 }}>✓</AppText>
            }
        } else {
            return null;
        }
    }

    return (

        <View styles={styles.container}>
            <AppTextInput
                append={errorSymbol(touched[name], errors[name])}
                onBlur={() => setFieldTouched(name)}
                onChangeText={text => setFieldValue(name, text)}
                value={values[name]}
                {...otherProps}
            />
            <View style={styles.errorContainer}>
                {touched[name] && <ErrorMessage error={errors[name]} />}
            </View>
        </View>

    )
}

export default AppFormInput

const styles = StyleSheet.create({
    container: {
        alignItems: "flex-start"
    },
    errorContainer: {
        marginLeft: 10
    }
})