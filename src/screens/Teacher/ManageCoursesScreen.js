import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, RefreshControl, ScrollView } from 'react-native'

import * as courseAPI from '../../api/courses';
import { AppIcon, AppText, AppButton, Card } from '../../components';
import colors from '../../config/styles/colors';
import useAuth from '../../Services/useAuth';

const ManageCoursesScreen = ({ navigation }) => {

    const [courses, setCourses] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const user = useAuth().user;

    const getCourses = async () => {
        setIsRefreshing(true);
        let result = await courseAPI.getCoursesFromTeacher(user.id);
        setCourses(result);
        setIsRefreshing(false);
    }

    useEffect(() => {
        getCourses();
    }, [])



    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl progressBackgroundColor="black" colors={[colors.WHITE, colors.DANGER, colors.SUCCESS]} refreshing={isRefreshing} onRefresh={getCourses} />}>
            <View style={styles.container}>
                {/* <AppText>Manage Courses</AppText> */}
                {courses.length == 0 ? (
                    <>
                        <AppText style={styles.helpText}>
                            You haven't created any course yet.
                </AppText>
                        <AppButton onPress={() => navigation.navigate('CreateCourseScreen')} btnTextStyle={{ fontSize: 14, fontWeight: "normal", fontFamily: "Asap-Regular", textTransform: 'none' }} title="Create a course now" />
                    </>
                ) :
                    <FlatList
                        refreshing={isRefreshing}
                        refreshControl={
                            <RefreshControl progressBackgroundColor="black" colors={[colors.WHITE, colors.DANGER, colors.SUCCESS]} refreshing={isRefreshing} onRefresh={getCourses} />
                        }
                        data={courses}
                        renderItem={({ item }) => <Card onPress={() => navigation.navigate('UploadCourseResources', { course: item })} title={item.name} subTitle="Shakthi Sachintha" description={item.description} />}
                        keyExtractor={item => item.id}
                    />
                }

            </View>
        </ScrollView>
    )
}

export default ManageCoursesScreen

const styles = StyleSheet.create({

    container: {
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",

        width: "100%",
        height: "100%"
    }

})
