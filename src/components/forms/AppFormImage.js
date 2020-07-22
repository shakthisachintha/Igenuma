import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useFormikContext } from 'formik';
import ImageInput from '../ImageInput';
import ErrorMessage from './ErrorMessage';


const AppFormImage = ({ name, ...otherProps }) => {

    const { setFieldTouched, setFieldValue, errors, touched, values } = useFormikContext();

    const handleAdd = (uri) => {
        setFieldValue(name, uri);
        setFieldTouched(name, true)
    }

    return (
        <View>
            <ImageInput {...otherProps} imageURI={values[name]} onChangeImage={handleAdd} />
            <View style={styles.errorContainer}>
                {touched[name] && <ErrorMessage error={errors[name]} />}
            </View>
        </View>
    )
}

export default AppFormImage

const styles = StyleSheet.create({
    errorContainer: {
        marginLeft: 10
    }
})
