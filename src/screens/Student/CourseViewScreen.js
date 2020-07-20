import React, { useState, useEffect } from 'react'
import { StyleSheet, RefreshControl, View, ImageBackground, FlatList, TouchableWithoutFeedback, Alert } from 'react-native'

import { AppText, AppButton, Card, AppIcon, ErrorHandler } from '../../components';
import colors from '../../config/styles/colors';
import { getResources } from '../../api/resources';
import { enrollCourse, isEnrolled, unEnrollCourse } from '../../api/courses';

import ResourceCard from '../../components/ResourceCard';
import useAuth from '../../Services/useAuth';


const CourseViewScreen = ({ navigation, route }) => {
    const auth = useAuth();

    const [course, setCourse] = useState(route.params.course);
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [resources, setResources] = useState([]);

    const getCourseResources = async () => {
        setIsRefreshing(true);
        setResources([]);

        const enrolled = await isEnrolled(course.id, auth.user.id);

        setCourse({ ...course, isEnrolled: enrolled });

        if (!enrolled) return setIsRefreshing(false);

        const result = await getResources(course.id);
        setIsRefreshing(false);
        setResources(result);
    }

    const handleEnroll = async (course, user) => {
        await enrollCourse(course.id, user.id);
        getCourseResources();
    }

    const handleUnEnroll = async (course, user) => {
        await unEnrollCourse(course.id, user.id);
        getCourseResources();
    }

    useEffect(() => {
        getCourseResources();
    }, [])

    return (
        <FlatList
            ListHeaderComponent={
                <View>
                    {course.image && (<View>
                        <ImageBackground source={{ uri: course.image }} blurRadius={0} style={styles.coverImage} >

                        </ImageBackground>
                    </View>)}

                    <View style={styles.container}>
                        <View>
                            <AppText style={styles.cardTitle}>{course.name}</AppText>
                            <AppText style={styles.teacher}>by {course.teacher.name}</AppText>
                        </View>

                        <AppText style={styles.description}>{course.description}</AppText>

                        <View style={styles.actionContainer}>
                            {course.isEnrolled ?
                                (<AppButton disabled={isRefreshing} onPress={() => handleUnEnroll(course, auth.user)} title="Unenroll" btnTextStyle={{ fontSize: 12 }} containerStyle={{ width: "25%", padding: 10, backgroundColor: colors.DANGER }} />)
                                :
                                (<AppButton disabled={isRefreshing} onPress={() => handleEnroll(course, auth.user)} title="Enroll" btnTextStyle={{ fontSize: 16 }} containerStyle={{ width: "40%", backgroundColor: colors.BLUE }} />)
                            }
                        </View>

                        {resources.length > 0 && <AppText style={styles.h3} >Course Resources</AppText>}

                    </View>
                </View>
            }

            ListEmptyComponent={
                <View style={{ flex: 1, marginTop: 70, alignItems: "center", justifyContent: "center" }}>
                    <AppText style={styles.helpText}>
                        {isRefreshing ? "Loading resources..." : course.isEnrolled ? "We couldn't find any resources for this course." : "Enroll now to see the course resources."}
                    </AppText>

                </View>
            }

            data={resources}
            refreshing={isRefreshing}
            renderItem={({ item }) => <ResourceCard createdAt={item.created_at} fileURI={item.url} resourceTitle={item.title} resourceDesc={item.description} fileName={item.fileName} />}
            keyExtractor={item => item.id}
            refreshControl={<RefreshControl progressBackgroundColor="black" colors={[colors.WHITE, colors.DANGER, colors.SUCCESS]} refreshing={isRefreshing} onRefresh={getCourseResources} />}
        />
    )
}

export default CourseViewScreen

const styles = StyleSheet.create({
    actionContainer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    coverImage: {
        width: "100%",
        aspectRatio: 16 / 9,
    },
    rightAction: {
        backgroundColor: colors.PRIMARY,
        // padding: 20,
        width: 100,
        alignItems: "center",
        justifyContent: "center"
    },
    h3: {
        fontFamily: "Asap-Regular",
        fontSize: 28,
        alignSelf: "flex-start",
        marginTop: 20,
        color: colors.SECONDARY
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
