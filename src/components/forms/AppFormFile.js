import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useFormikContext } from 'formik';

import ErrorMessage from './ErrorMessage';
import FileInput from '../FileInput';


const AppFormFile = ({ name }) => {

    const { setFieldTouched, setFieldValue, errors, touched, values } = useFormikContext();

    const handleChange = async (uri, fileName) => {
        setFieldTouched(name, true);
        setFieldValue(name, { uri: uri, fileName: fileName });
    }

    return (
        <View>
            <FileInput fileURI={values[name].uri} fileName={values[name].fileName} onChangeFile={handleChange} />
            <View style={styles.errorContainer}>
                {touched[name] && <ErrorMessage error={errors[name] ? errors[name].fileName : null} />}
            </View>
        </View>
    )
}

export default AppFormFile

const styles = StyleSheet.create({
    errorContainer: {
        marginLeft: 10
    }
})
