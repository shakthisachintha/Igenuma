import React, { useState } from 'react'
import { StyleSheet, RefreshControl, View, ImageBackground, FlatList } from 'react-native'


import { AppText, AppButton } from '../../components';
import colors from '../../config/styles/colors';




const CourseOverviewScreen = ({ navigation, route }) => {
    const course = route.params.course;
    const [isRefreshing, setIsRefreshing] = useState(false)

    const [resources, setResources] = useState([]);

    const getCourseResources = () => {

    }

    return (
        <FlatList
            ListHeaderComponent={
                <View>
                    <View>
                        <ImageBackground source={{ uri: course.image }} blurRadius={0} style={styles.coverImage} >
                        </ImageBackground>
                    </View>
                    <View style={styles.container}>
                        <AppText style={styles.cardTitle}>{course.name}</AppText>
                        <AppText style={styles.description}>{course.description}</AppText>
                        <AppText style={styles.teacher}>{course.teacher.name}</AppText>
                    </View>
                </View>
            }

            ListEmptyComponent={
                <View style={{ flex: 1, marginTop: 70, alignItems: "center", justifyContent: "center" }}>
                    <AppText style={styles.helpText}>
                        You haven't uploaded any resources to this course yet.
                            </AppText>
                    <AppButton onPress={() => navigation.navigate('UploadCourseResources', { course })} btnTextStyle={{ fontSize: 14, fontWeight: "normal", fontFamily: "Asap-Regular", textTransform: 'none' }} title="Upload resources" />
                </View>
            }


            data={resources}
            refreshing={isRefreshing}
            renderItem={({ item }) => <AppText>{item.name}</AppText>}
            keyExtractor={item => item.id}
            refreshControl={<RefreshControl progressBackgroundColor="black" colors={[colors.WHITE, colors.DANGER, colors.SUCCESS]} refreshing={isRefreshing} onRefresh={getCourseResources} />}
        />
    )
}

export default CourseOverviewScreen

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
