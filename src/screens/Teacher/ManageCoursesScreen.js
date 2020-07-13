import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, RefreshControl, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import * as courseAPI from '../../api/courses';
import { AppText, AppButton, Card } from '../../components';
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
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={{ flexGrow: 1 }}

                ListEmptyComponent={
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <AppText style={styles.helpText}>
                            You haven't created any course yet.
                            </AppText>
                        <AppButton onPress={() => navigation.navigate('CreateCourseScreen')} btnTextStyle={{ fontSize: 14, fontWeight: "normal", fontFamily: "Asap-Regular", textTransform: 'none' }} title="Create a course now" />
                    </View>
                }


                refreshing={isRefreshing}
                refreshControl={
                    <RefreshControl progressBackgroundColor="black" colors={[colors.WHITE, colors.DANGER, colors.SUCCESS]} refreshing={isRefreshing} onRefresh={getCourses} />
                }
                data={courses}
                renderItem={({ item }) => <Card onPress={() => navigation.navigate('CourseOverview', { course: item })} title={item.name} subTitle="Shakthi Sachintha" description={item.description} />}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default ManageCoursesScreen

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        width: "100%",
        height: "100%"
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },

})