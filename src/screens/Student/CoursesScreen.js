import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, RefreshControl, ScrollView } from 'react-native'

import * as courseAPI from '../../api/courses';
import { AppText, AppButton, Card } from '../../components';
import colors from '../../config/styles/colors';
import useAuth from '../../Services/useAuth';

const CourseScreen = ({ navigation }) => {

    const [courses, setCourses] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const user = useAuth().user;

    const getCourses = async () => {
        setIsRefreshing(true);
        let result = await courseAPI.getCourses(user.id);
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
                            We couldn't find any courses yet...
                            </AppText>
                    </View>
                }


                refreshing={isRefreshing}
                refreshControl={
                    <RefreshControl progressBackgroundColor="black" colors={[colors.WHITE, colors.DANGER, colors.SUCCESS]} refreshing={isRefreshing} onRefresh={getCourses} />
                }
                data={courses}
                renderItem={({ item }) => <Card onPress={() => navigation.navigate('CourseOverview', { course: item })} title={item.name} subTitle={item.teacher.name} description={item.description} />}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default CourseScreen

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