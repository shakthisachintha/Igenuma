import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { DrawerActions } from '@react-navigation/native';


import { CourseResourceUploadScreen, ManageCoursesScreen, CourseEditScreen, CourseOverviewScreen } from '../../screens/Teacher/';
import { AppIcon, AppHeader } from '../../components';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

// const navigation = useNavigation();


const headerLeft = (navigation) => {
    return (
        <TouchableWithoutFeedback onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <AppIcon name="format-list-bulleted" iconColor="black" backgroundColor="transparent" />
        </TouchableWithoutFeedback>
    )
}

const CourseNavigator = () => (

    <Stack.Navigator mode="modal" screenOptions={{
        header: ({ navigation, scene }) => { return <AppHeader title={scene.route.params.course.name} navigation={navigation} /> }
    }}>
        <Stack.Screen
            name="ManageCourses"
            component={ManageCoursesScreen}
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="CourseOverview"
            component={CourseOverviewScreen}
            options={({ route }) => ({ title: route.params.course.name })}
        />

        <Stack.Screen
            name="UploadCourseResources"
            component={CourseResourceUploadScreen}
            options={({ route }) => ({ title: route.params.course.name })}
        />

        <Stack.Screen
            name="EditCourse"
            component={CourseEditScreen}
            options={({ route }) => ({ title: route.params.course.name })}
        />

    </Stack.Navigator>
)

export default CourseNavigator;