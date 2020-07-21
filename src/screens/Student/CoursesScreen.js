import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native'

import * as courseAPI from '../../api/courses';
import { AppText, Card, AppHeader } from '../../components';
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
        <FlatList
            stickyHeaderIndices={[0]}
            ListHeaderComponent={
                <AppHeader navigation={navigation} title="Available courses" />
            }
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
                <RefreshControl progressViewOffset={50} progressBackgroundColor="black" colors={[colors.WHITE, colors.DANGER, colors.SUCCESS]} refreshing={isRefreshing} onRefresh={getCourses} />
            }
            showsVerticalScrollIndicator={false}
            data={courses}
            renderItem={({ item }) =>
                <View style={styles.container}>
                    <Card titleStyles={{ fontSize: 20 }}
                        image={item.image} onPress={() => navigation.navigate('CourseOverview', { course: item })}
                        title={item.name}
                        subTitle={item.teacher.name}
                        description={item.description} />
                </View>}
            keyExtractor={item => item.id}
        />
    )
}

export default CourseScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        width: "100%"
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },

})