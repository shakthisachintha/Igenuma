import React, { useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import * as Yup from 'yup';


import { AppForm, AppFormInput, SubmitButton } from '../../components/forms'
import { AppButton, ImageInput } from '../../components';

const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Course name"),
    description: Yup.string().required().min(10).label("Course description"),
    // password: Yup.string().required().min(6).label("Password"),
    // userType: Yup.string().required().label('User role'),
    // confirm_password: Yup.string().required().oneOf([Yup.ref('password')], 'Passwords must match')
});


const CreateCourseScreen = () => {

    const [imageURI, setImageURI] = useState(null)


    return (
        <View>
            {/* <AppButton title="Show Image" onPress={getImage} /> */}
            <Image style={{ width: 100, height: 100 }} source={{ uri: imageURI }} />

            <ImageInput onChangeImage={uri => setImageURI(uri)} imageURI={imageURI} />

            <AppForm
                initialValues={{ name: "", description: "" }}
                validationSchema={validationSchema}
            >

                <AppFormInput
                    autoCapitalize="words"
                    autoCorrect={false}
                    name="name"
                    placeholder="Course name"
                />
                <AppFormInput
                    autoCorrect={false}
                    name="description"
                    multiline={true}
                    numberOfLines={3}
                    placeholder="Course description"
                />

                <SubmitButton title="Create course" />

            </AppForm>
        </View>
    )
}

export default CreateCourseScreen

const styles = StyleSheet.create({})
