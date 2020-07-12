import React from 'react'
import { StyleSheet, ScrollView, Text, View, Image, ImageBackground } from 'react-native'
import { AppText, FileInput } from '../../components';
import colors from '../../config/styles/colors';
import { AppForm, AppFormFile } from '../../components/forms';



const CourseResourceUploadScreen = ({ navigation, route }) => {
    const course = route.params.course;


    return (
        <ScrollView>
            <View>
                <View>
                    <ImageBackground source={{ uri: course.image }} blurRadius={4} style={styles.coverImage} >

                    </ImageBackground>
                </View>
                <View style={styles.container}>
                    <AppText style={styles.cardTitle}>{course.name}</AppText>
                    <AppText style={styles.description}>{course.description}</AppText>
                    {/* <AppText style={styles.teacher}>{course.teacher.name}</AppText> */}

                    <View style={styles.formContainer}>
                        <AppForm>
                            <FileInput onChangeFile={(data) => console.log(data)} />
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
