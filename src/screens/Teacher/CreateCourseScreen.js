import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import * as Yup from 'yup';

import * as courseAPI from '../../api/courses';

import { AppForm, AppFormInput, SubmitButton, AppFormImage } from '../../components/forms'
import { ErrorHandler } from '../../components';
import UploadScreen from '../UploadScreen';

const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Course name"),
    description: Yup.string().required().min(10).label("Course description"),
});


const CreateCourseScreen = () => {
    const [uploadVisible, setUploadVisible] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);
    const [progress, setProgress] = useState(0);


    const handleSubmit = async (values, { resetForm }) => {
        setProgress(0);
        setIndeterminate(true);
        setUploadVisible(true);
        try {
            const id = await courseAPI.createCourse(values);
            setIndeterminate(false);
            if (values.image) {
                const onStateChange = (progress) => {
                    setProgress(progress);
                }
                const updateImageURI = async (URI) => {
                    await courseAPI.updateCourse(id, { image: URI });
                }

                courseAPI.addCourseImage(values.image, id, onStateChange, updateImageURI)
            } else {
                setProgress(1);
            }

        } catch (error) {

            <ErrorHandler error={error} />
        }
        resetForm();
    }

    return (
        <>
            <UploadScreen onDone={() => setUploadVisible(false)} indeterminate={indeterminate} progress={progress} visible={uploadVisible} />
            <View style={styles.container}>

                <AppForm
                    initialValues={{ name: "", description: "", image: null }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >

                    <AppFormImage name="image" />
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
        </>
    )
}

export default CreateCourseScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 40,
        alignItems: "center",
        justifyContent: "center"
    }
})
