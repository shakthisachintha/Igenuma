import React, { useState } from 'react'
import { StyleSheet, ScrollView, RefreshControl, View, Image, ImageBackground } from 'react-native'
import * as Yup from 'yup';

import { AppText, FileInput } from '../../components';
import colors from '../../config/styles/colors';
import { AppForm, AppFormFile, AppFormInput, SubmitButton } from '../../components/forms';



const CourseResourceUploadScreen = ({ navigation, route }) => {
    const course = route.params.course;
    const [isRefreshing, setIsRefreshing] = useState(false)

    const getCourseResources = () => {

    }


    const validationSchema = Yup.object().shape({
        course: Yup.string().required(),
        title: Yup.string().required().label("Resource title"),
        description: Yup.string().min(10).label("Resource description"),
        file: Yup.object().shape({
            uri: Yup.string().required('Resource file is required').nullable(),
            fileName: Yup.string().required('Resource file is required').nullable(),
        })
    });

    return (
        <ScrollView refreshControl={<RefreshControl progressBackgroundColor="black" colors={[colors.WHITE, colors.DANGER, colors.SUCCESS]} refreshing={isRefreshing} onRefresh={getCourseResources} />}>
            <View>
                <View>
                    <ImageBackground source={{ uri: course.image }} blurRadius={4} style={styles.coverImage} >

                    </ImageBackground>
                </View>
                <View style={styles.container}>
                    <AppText style={styles.cardTitle}>{course.name}</AppText>
                    <AppText style={styles.description}>{course.description}</AppText>
                    <AppText style={styles.teacher}>{course.teacher.name}</AppText>

                    <View style={styles.formContainer}>
                        <AppForm
                            initialValues={{ course: course.id, file: { fileName: null, uri: "" }, title: "", description: "" }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => console.log(values)}
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




            </View>

        </ScrollView>
    )
}

export default CourseResourceUploadScreen

const styles = StyleSheet.create({
    coverImage: {
        width: "100%",
        aspectRatio: 16 / 9,
    },

    cardTitle: {
        fontFamily: "Asap-SemiBold",
        fontSize: 26,
        color: colors.black
    },
    teacher: {
        fontSize: 14,
        fontWeight: "normal",
        fontFamily: "Asap-Medium",
        marginTop: 3,
        color: colors.BLUE
    },
    container: {
        padding: 10
    },
    description: {
        fontSize: 16,
        fontFamily: "Asap-Regular",
        marginTop: 10,
        color: colors.PRIMARY
    },
})
