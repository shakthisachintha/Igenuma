import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native'


import { AppText, Card, AppTextButton, Carasoul, AppHeader } from '../../components'
import useAuth from '../../Services/useAuth'
import { getStudentFeed, getNewCourses } from '../../api/courses';
import ResourceCard from '../../components/ResourceCard';
import colors from '../../config/styles/colors';


const DashboardScreen = ({ navigation }) => {

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [feedItems, setFeedItems] = useState([]);
    const [newCourses, setNewCourses] = useState([]);
    const user = useAuth().user;


    const refreshFeed = async () => {
        setIsRefreshing(true);
        const feed = await getStudentFeed(user.id);
        const latest = await getNewCourses();
        setIsRefreshing(false);
        setNewCourses(latest);
        setFeedItems(feed);
    }

    const carouselItem = ({ item, index }) => {
        return (
            <View>
                <Card
                    onPress={() => navigation.navigate('Courses', { screen: 'CourseOverview', params: { course: item } })}
                    title={item.name}
                    image={item.image}
                    description={item.description} />
            </View>
        )
    }

    useEffect(() => {
        refreshFeed();
    }, [])

    return (
        <>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
                ListHeaderComponent={
                    <>
                        <AppHeader title="Course updates" navigation={navigation} />
                        {feedItems.length > 0 &&
                            <View style={{ paddingVertical: 20 }}>
                                <AppText style={{ alignSelf: "center", textTransform: "uppercase", marginBottom: 10 }}>Recently added courses</AppText>

                                <Carasoul data={newCourses} renderItem={carouselItem} pagination={true} />
                            </View>
                        }

                        {feedItems.length > 0 && (
                            <AppText style={styles.h2}>Course resources updates</AppText>
                        )}
                    </>
                }

                ListEmptyComponent={
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <View style={{ alignItems: "center" }}>
                            <AppText>
                                We couldn't find any course updates.
                            </AppText>

                            <AppText style={{ textTransform: "uppercase", marginBottom: 10, marginTop: 10 }}>Recently added courses</AppText>

                            <Carasoul data={newCourses} renderItem={carouselItem} pagination={false} />

                            <AppTextButton onPress={() => navigation.navigate('Courses')} icon={{ name: 'bell-circle-outline', size: 14 }} btnTextStyle={{ color: colors.black, fontSize: 15, textTransform: "none" }} title="Enroll now to get updates" />
                        </View>
                    </View>
                }

                refreshing={isRefreshing}
                refreshControl={
                    <RefreshControl progressViewOffset={100} progressBackgroundColor="black" colors={[colors.WHITE, colors.DANGER, colors.SUCCESS]} refreshing={isRefreshing} onRefresh={refreshFeed} />
                }
                data={feedItems}
                renderItem={({ item }) => <View style={styles.container}><ResourceCard courseName={item.course.name} resourceTitle={item.title} fileName={item.fileName} createdAt={item.created_at} resourceDesc={item.description} fileURI={item.url} /></View>}
                keyExtractor={item => item.id}
            />
        </>
    )
}

export default DashboardScreen

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    container: {
        paddingHorizontal: 10
    },
    h1: {
        fontSize: 28,
        color: colors.WHITE
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
        color: colors.SECONDARY
    },
    navBtnContainer: {
        marginLeft: 5,
        marginRight: 15
    },

})
