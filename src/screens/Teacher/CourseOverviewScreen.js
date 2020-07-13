import React, { useState, useEffect } from 'react'
import { StyleSheet, RefreshControl, View, ImageBackground, FlatList, TouchableWithoutFeedback, Alert } from 'react-native'

import { AppText, AppButton, Card, AppIcon, ErrorHandler } from '../../components';
import colors from '../../config/styles/colors';
import { getResources, deleteResource } from '../../api/resources';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import ResourceCard from '../../components/ResourceCard';


const CourseOverviewScreen = ({ navigation, route }) => {
    const course = route.params.course;
    const [isRefreshing, setIsRefreshing] = useState(false)

    const [resources, setResources] = useState([]);

    const getCourseResources = async () => {
        setIsRefreshing(true);
        const result = await getResources(course.id);
        setIsRefreshing(false);
        setResources(result);
    }

    useEffect(() => {
        getCourseResources();
    }, [])

    const handleDelete = async (id, fileName) => {
        try {
            await deleteResource(id, fileName);
            getCourseResources();
        } catch (error) {
            ErrorHandler(error)
        }

    }

    const rightAction = (resourceID, fileName) => {
        return (
            <View style={{ flexDirection: "row" }}>
                <TouchableWithoutFeedback onPress={() => Alert.alert("Delete resource", "Are you sure want to delete this resource?", [{ text: "Yes", style: "destructive", onPress: () => handleDelete(resourceID, fileName) }, { text: "Cancel", style: "cancel" }])}>
                    <View style={styles.rightAction} >
                        <AppIcon name="trash-can" backgroundColor="white" iconColor="tomato" />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }


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
                        </View>

                        <AppText style={styles.description}>{course.description}</AppText>
                        {/* <AppText style={styles.teacher}>{course.teacher.name}</AppText> */}

                        {resources.length > 0 && (<View style={styles.actionContainer}>
                            <AppButton onPress={() => navigation.navigate('UploadCourseResources', { course })} title="Upload resource" btnTextStyle={{ fontSize: 16 }} containerStyle={{ width: "40%" }} />
                        </View>)}

                        {resources.length > 0 && <AppText style={styles.h3} >Course Resources</AppText>}

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
            renderItem={({ item }) => <ResourceCard createdAt={item.created_at} fileURI={item.url} courseName={course.name} rightAction={() => rightAction(item.id, item.fileName)} resourceTitle={item.title} resourceDesc={item.description} fileName={item.fileName} />}
            keyExtractor={item => item.id}
            refreshControl={<RefreshControl progressBackgroundColor="black" colors={[colors.WHITE, colors.DANGER, colors.SUCCESS]} refreshing={isRefreshing} onRefresh={getCourseResources} />}
        />
    )
}

export default CourseOverviewScreen

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
