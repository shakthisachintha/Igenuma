import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import * as Yup from 'yup';

import * as courseAPI from '../../api/courses';

import { AppForm, AppFormInput, SubmitButton, AppFormImage } from '../../components/forms'
import { ErrorHandler, AppButton } from '../../components';
import UploadScreen from '../UploadScreen';
import useAuth from '../../Services/useAuth';
import colors from '../../config/styles/colors';

const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Course name"),
    description: Yup.string().required().min(10).label("Course description"),
});


const CreateCourseScreen = ({ navigation }) => {
    const [uploadVisible, setUploadVisible] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);
    const [progress, setProgress] = useState(0);
    const user = useAuth().user;

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

            ErrorHandler(error)
        }
        resetForm();
    }

    return (
        <>
            <UploadScreen onDone={() => setUploadVisible(false)} text="Creating course..." indeterminate={indeterminate} progress={progress} visible={uploadVisible} />
            <View style={styles.container}>

                <AppForm
                    initialValues={{ teacher: { id: user.id, name: user.name }, name: "", description: "", image: null }}
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
                <AppButton containerStyle={{ backgroundColor: null }} btnTextStyle={{ color: colors.PRIMARY, fontSize: 14, fontWeight: "normal", fontFamily: "Asap-Regular", textTransform: 'none' }} onPress={() => navigation.navigate('ManageCourses')} title="View courses" />
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
