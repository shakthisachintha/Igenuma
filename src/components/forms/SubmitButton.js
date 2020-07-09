import React from 'react'
import { useFormikContext } from 'formik'
import AppButton from '../AppButton';


const SubmitButton = ({ title, ...otherProps }) => {
    const { handleSubmit } = useFormikContext();
    return (
        <AppButton title={title} {...otherProps} onPress={handleSubmit} />
    )
}

export default SubmitButton
