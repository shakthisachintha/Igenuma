import React, { useState } from 'react'
import * as Yup from 'yup';
import { StyleSheet, View } from 'react-native'
import { CommonActions } from '@react-navigation/native';

import { AppForm, AppFormFile, AppFormInput, SubmitButton } from '../../components/forms';
import { AppText, ErrorHandler } from '../../components';
import UploadScreen from '../UploadScreen';
import { uploadResource } from '../../api/resources';


const validationSchema = Yup.object().shape({
    course: Yup.string().required(),
    title: Yup.string().required().label("Resource title"),
    description: Yup.string().min(10).label("Resource description"),
    file: Yup.object().shape({
        uri: Yup.string().required('Resource file is required').nullable(),
        fileName: Yup.string().required('Resource file is required').nullable(),
    })
});

const CourseResourceUploadScreen = ({ navigation, route }) => {
    const course = route.params.course;


    const [uploadVisible, setUploadVisible] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);
    const [progress, setProgress] = useState(0);

    const onStateChange = (progress) => {
        setProgress(progress);
    }

    const onDone = (uri) => {
        setUploadVisible(false);
        navigation.dispatch(CommonActions.goBack());
    }

    const handleSubmit = async (values, { resetForm }) => {
        setProgress(0);
        setUploadVisible(true);
        try {
            const result = await uploadResource(values, onStateChange);
            if (result === false) throw (new Error("We couldn't upload that file."))
        } catch (error) {
            setUploadVisible(false);
            ErrorHandler(error)
        }
        resetForm();
    }

    return (
        <>
            <UploadScreen onDone={onDone} text="Uploading resource..." indeterminate={indeterminate} progress={progress} visible={uploadVisible} />
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <AppText style={styles.h1}>Upload Resource</AppText>
                    <AppForm
                        initialValues={{ course: course, file: { fileName: null, uri: "" }, title: "", description: "" }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >

                        <AppFormInput
                            autoCapitalize="words"
                            autoCorrect={false}
                            name="title"
                            placeholder="Resource title"
                        />
                        <AppFormInput
                            autoCorrect={false}
                            name="description"
                            indicateSymbol={false}
                            multiline={true}
                            numberOfLines={3}
                            placeholder="Resource description"
                        />
                        <AppFormFile name="file" />
                        <SubmitButton title="Upload resource" />
                    </AppForm>
                </View>
            </View>
        </>

    )
}

export default CourseResourceUploadScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    formContainer: {
        paddingHorizontal: 30,
        width: "100%"
    },
    h1: {
        fontFamily: "Asap-SemiBold",
        fontSize: 38,
        alignSelf: "flex-start",
        marginBottom: 20
    },
})
