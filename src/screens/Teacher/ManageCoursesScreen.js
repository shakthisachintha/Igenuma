import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, RefreshControl, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import * as courseAPI from '../../api/courses';
import { AppText, AppButton, Card, AppHeader, AppTextButton } from '../../components';
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

        <FlatList
            contentContainerStyle={{ flexGrow: 1 }}

            ListHeaderComponent={<AppHeader navigation={navigation} title="Manage my courses" />}

            ListEmptyComponent={
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <AppText style={styles.helpText}>
                        You haven't created any course yet.
                            </AppText>
                    <AppTextButton icon={{ name: "book-plus-multiple", size: 14 }} onPress={() => navigation.navigate('CreateCourseScreen')} btnTextStyle={{ fontSize: 14, fontWeight: "normal", fontFamily: "Asap-Regular", textTransform: 'none' }} title="Create a course now" />
                </View>
            }


            refreshing={isRefreshing}
            refreshControl={
                <RefreshControl progressViewOffset={50} progressBackgroundColor="black" colors={[colors.WHITE, colors.DANGER, colors.SUCCESS]} refreshing={isRefreshing} onRefresh={getCourses} />
            }
            data={courses}
            renderItem={({ item }) => <View style={styles.container}><Card image={item.image} onPress={() => navigation.navigate('CourseOverview', { course: item })} title={item.name} subTitle={item.teacher.name} description={item.description} /></View>
            }
            keyExtractor={item => item.id}
        />

    )
}

export default ManageCoursesScreen

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        paddingHorizontal: 10,
    }
})