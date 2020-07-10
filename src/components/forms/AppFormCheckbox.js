import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import { useFormikContext } from 'formik';

import AppText from '../AppText';
import colors from '../../config/styles/colors';
import ErrorMessage from './ErrorMessage';

const AppFormCheckbox = ({ name, label }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const { setFieldValue, handleChange, setFieldTouched, errors, touched } = useFormikContext()
    const toggleFunction = () => {
        toggleCheckBox ? setToggleCheckBox(false) : setToggleCheckBox(true);
        setFieldValue(name, toggleCheckBox);
        setFieldTouched(name);
        handleChange(name)
    }

    return (
        <View style={styles.container}>
            <View style={styles.checkBox}>
                <CheckBox
                    tintColors={{ true: colors.PRIMARY, false: colors.DANGER }}
                    disabled={false}
                    value={toggleCheckBox}
                    onChange={toggleFunction}
                />
                <AppText style={styles.label}>{label}</AppText>
            </View>

            <View style={styles.errorContainer}>
                {touched[name] && !toggleCheckBox && <ErrorMessage error={errors[name]} />}
            </View>
        </View>

    )
}

export default AppFormCheckbox

const styles = StyleSheet.create({
    container: {
        marginLeft: 1
    },
    checkBox: {
        flexDirection: "row",
        marginVertical: 10,
        alignItems: "center",
    },
    errorContainer: {
        flexDirection: "column",
        marginLeft: 10
    },
    label: {
        color: colors.SECONDARY,
        marginLeft: 5
    }
})
