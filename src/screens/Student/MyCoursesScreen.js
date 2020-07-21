import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, RefreshControl, Image, TouchableWithoutFeedback } from 'react-native'

import { enrolledCourses } from '../../api/courses';
import useAuth from '../../Services/useAuth';
import colors from '../../config/styles/colors';
import { AppHeader, AppText, AppButton, AppTextButton } from '../../components';

const MyCoursesScreen = ({ navigation }) => {

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [myCourses, setMyCourses] = useState([])

    const user = useAuth().user;

    const fetchMyCourses = async () => {
        setIsRefreshing(true);
        const courses = await enrolledCourses(user.id);
        setIsRefreshing(false);
        // console.log(courses);
        setMyCourses(courses);
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Courses', { screen: 'CourseOverview', params: { course: item } })}>
                <View style={{ padding: 10 }}>
                    <View style={{
                        backgroundColor: colors.WHITE,
                        shadowColor: "black",
                        shadowOffset: { height: 40, width: 40 },
                        shadowRadius: 10,
                        paddingVertical: 20,
                        elevation: 2,
                        shadowOpacity: 0.1,
                    }}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                            <Image source={{ uri: item.image }} style={{ width: 70, height: 70, marginRight: 8, marginLeft: 10, borderRadius: 50 }} />
                            <View style={{ flex: 1, flexDirection: "column" }}>
                                <AppText numberOfLines={2} style={styles.h1}>{item.name}</AppText>
                                <AppText style={styles.muted}>{item.teacher.name}</AppText>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    const ItemSeparator = () => {
        return (<View
            style={{
                height: 1,
                width: "100%",
                backgroundColor: colors.SECONDARY,
                opacity: 0.3,
                marginVertical: 10
            }}
        />)
    }

    useEffect(() => {
        fetchMyCourses();
    }, [])

    return (
        <FlatList
            ListHeaderComponent={
                <AppHeader title="Enrolled courses" navigation={navigation} />
            }
            // ItemSeparatorComponent={ItemSeparator}
            renderItem={renderItem}
            data={myCourses}
            refreshing={isRefreshing}
            refreshControl={<RefreshControl progressViewOffset={50} progressBackgroundColor="black" colors={[colors.WHITE, colors.DANGER, colors.SUCCESS]} refreshing={isRefreshing} onRefresh={fetchMyCourses} />}
            keyExtractor={item => item.id}
        />
    )
}

export default MyCoursesScreen

const styles = StyleSheet.create({
    h1: {
        fontSize: 24,
        fontFamily: "Asap-Medium",
    },
    h2: {
        padding: 15,
        paddingLeft: 18,
        opacity: 0.5,
        backgroundColor: "gray",
        width: "100%",
        alignSelf: "center",
        fontSize: 18,
        color: colors.PRIMARY,
        fontFamily: "Asap-Regular",
        marginBottom: 25
    },
    headerContainer: {
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 15,
        backgroundColor: colors.PRIMARY
    },
    muted: {
        color: colors.SECONDARY,
        fontFamily: "Asap-Regular"
    },
})
