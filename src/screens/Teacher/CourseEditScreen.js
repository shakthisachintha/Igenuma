import React, { useState } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import * as Yup from 'yup';

import * as courseAPI from '../../api/courses';

import { AppForm, AppFormInput, SubmitButton, AppFormImage } from '../../components/forms'
import { ErrorHandler, AppButton, AppHeader, AppText } from '../../components';
import UploadScreen from '../UploadScreen';
import useAuth from '../../Services/useAuth';
import colors from '../../config/styles/colors';

const validationSchema = Yup.object().shape({
    id: Yup.string().required(),
    name: Yup.string().required().label("Course name"),
    description: Yup.string().required().min(10).label("Course description"),
});


const CourseEditScreen = ({ navigation, route }) => {
    const [uploadVisible, setUploadVisible] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteState, setDeleteState] = useState("delete course")
    const user = useAuth().user;

    const course = route.params.course;

    const deleteStateChange = (state) => {
        setDeleteState(state);
    }

    const handleCourseDelete = async () => {
        try {
            setIsDeleting(true);
            await courseAPI.deleteCourse(course, deleteStateChange);
            setIsDeleting(false);
            setTimeout(() => {
                navigation.reset({ index: 0, routes: [{ name: 'ManageCourses' }] })
            }, 300);
        } catch (error) {
            alert(error);
        }

    }

    const deleteConfirmation = () => {
        Alert.alert(
            "Delete course",
            "Are you sure you want to delete this course?\nThis action cannot be undone.",
            [
                {
                    text: "Yes",
                    style: "default",
                    onPress: handleCourseDelete
                },
                {
                    text: "No",
                    style: "cancel",
                }
            ]
        )
    }

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
                <AppText style={styles.h1}>Update Course</AppText>
                <AppForm
                    initialValues={{ id: course.id, teacher: { id: user.id, name: user.name }, name: course.name, description: course.description, image: course.image }}
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

                    <SubmitButton title="Update course" />

                </AppForm>
                <AppButton
                    loading={isDeleting}
                    loaderColor="white"
                    containerStyle={{ backgroundColor: colors.DANGER, marginTop: 30 }}
                    btnTextStyle={{ color: colors.WHITE, fontSize: 14, fontWeight: "normal", fontFamily: "Asap-Regular" }}
                    onPress={deleteConfirmation}
                    title={deleteState} />
            </View>
        </>
    )
}

export default CourseEditScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    h1: {
        fontFamily: "Asap-Regular",
        fontSize: 32,
        marginLeft: 10,
        alignSelf: "flex-start",
        marginBottom: 25,
        color: colors.SECONDARY
    },
})
