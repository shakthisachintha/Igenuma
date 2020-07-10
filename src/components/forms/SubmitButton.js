import React from 'react'
import { useFormikContext } from 'formik'
import AppButton from '../AppButton';


const SubmitButton = ({ title, loading, ...otherProps }) => {
    const { handleSubmit } = useFormikContext();
    return (
        <AppButton loading={loading} title={title} {...otherProps} onPress={handleSubmit} />
    )
}

export default SubmitButton
