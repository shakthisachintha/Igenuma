import React, { useState } from 'react'
import { StyleSheet, Alert, ScrollView, Image, ToastAndroid, TouchableWithoutFeedback } from 'react-native'
import * as Yup from 'yup';

import * as courseAPI from '../../api/courses';

import { AppForm, AppFormInput, SubmitButton } from '../../components/forms'
import { ErrorHandler, AppButton, AppText } from '../../components';
import useAuth from '../../Services/useAuth';
import colors from '../../config/styles/colors';


const validationSchema = Yup.object().shape({
    id: Yup.string().required(),
    name: Yup.string().required().label("Course name"),
    description: Yup.string().required().min(10).label("Course description"),
});


const CourseEditScreen = ({ navigation, route }) => {

    const [isUpdating, setIsUpdating] = useState(false);
    const [updateState, setUpdateState] = useState('update course')

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
            ToastAndroid.showWithGravity("Course deleted", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            setTimeout(() => {
                navigation.reset({ index: 0, routes: [{ name: 'ManageCourses' }] });
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

    const handleUpdate = async ({ id, name, description, teacher }, { resetForm }) => {

        try {
            setUpdateState("Updating...")
            setIsUpdating(true);
            await courseAPI.updateCourse(id, { name, description, teacher });
            setIsUpdating(false);
            setUpdateState("Updated");
            ToastAndroid.showWithGravity("Course updated", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            setTimeout(() => {
                setUpdateState("update course");
                navigation.reset({ index: 0, routes: [{ name: 'ManageCourses' }] });
            }, 500);
        } catch (error) {
            setIsUpdating(false);
            setUpdateState("Error occured");
            setTimeout(() => {
                setUpdateState("update course");
            }, 2000);
            resetForm();
            ErrorHandler(error)
        }
    }

    return (
        <>
            <ScrollView contentContainerStyle={styles.container}>
                <AppText style={styles.h1}>Update Course</AppText>
                <AppForm
                    initialValues={{ id: course.id, teacher: { id: user.id, name: user.name }, name: course.name, description: course.description }}
                    validationSchema={validationSchema}
                    onSubmit={handleUpdate}
                >
                    {course.image &&
                        <TouchableWithoutFeedback onPress={() => ToastAndroid.showWithGravity("Cannot change image", ToastAndroid.SHORT, ToastAndroid.CENTER)} >
                            <Image style={{ aspectRatio: 16 / 9, width: "99%", marginBottom: 10, borderRadius: 20 }} source={{ uri: course.image }} />
                        </TouchableWithoutFeedback>
                    }

                    <AppFormInput
                        autoCapitalize="words"
                        autoCorrect={false}
                        indicateSymbol={false}
                        name="name"
                        placeholder="Course name"
                    />
                    <AppFormInput
                        autoCorrect={false}
                        indicateSymbol={false}
                        name="description"
                        multiline={true}
                        numberOfLines={3}
                        placeholder="Course description"
                    />

                    <SubmitButton loading={isUpdating} title={updateState} />

                </AppForm>
                <AppButton
                    loading={isDeleting}
                    loaderColor="white"
                    containerStyle={{ backgroundColor: colors.DANGER, marginTop: 30 }}
                    btnTextStyle={{ color: colors.WHITE, fontSize: 14, fontWeight: "normal", fontFamily: "Asap-Regular" }}
                    onPress={deleteConfirmation}
                    title={deleteState} />
            </ScrollView>
        </>
    )
}

export default CourseEditScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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
