import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useFormikContext } from 'formik';

import ErrorMessage from './ErrorMessage';
import FileInput from '../FileInput';


const AppFormFile = ({ name }) => {

    const { setFieldTouched, setFieldValue, errors, touched } = useFormikContext();

    const handleChange = (res) => {
        setFieldValue(name, res.uri);
        setFieldTouched(name, true);
    }

    return (
        <View>
            <FileInput onChangeFile={handleChange} />
            <View style={styles.errorContainer}>
                {touched[name] && <ErrorMessage error={errors[name]} />}
            </View>
        </View>
    )
}

export default AppFormFile

const styles = StyleSheet.create({})
