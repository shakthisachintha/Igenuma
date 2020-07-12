import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { DrawerActions } from '@react-navigation/native';
// import { NavigationContext } from '@react-navigation/native';
// import { useNavigation } from '@react-navigation/native'
// import { DrawerActions } from 'react-navigation'

import { CourseResourceUploadScreen, ManageCoursesScreen } from '../screens/Teacher/';
import { AppIcon } from '../components';
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

    <Stack.Navigator screenOptions={({ navigation, route }) => ({ headerLeft: () => headerLeft(navigation), headerTransparent: false, headerStyle: { backgroundColor: "white" }, headerTitleStyle: { fontFamily: "Asap-Regular", alignSelf: "flex-end" }, gestureEnabled: true, headerTintColor: "black", gestureDirection: "horizontal", gestureVelocityImpact: 0.5 })} >

        <Stack.Screen
            name="ManageCourses"
            component={ManageCoursesScreen}
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="UploadCourseResources"
            component={CourseResourceUploadScreen}
            options={({ route }) => ({ title: route.params.course.name })}
        />

        {/* <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
                headerShown: false,
            }}
        /> */}

    </Stack.Navigator>
)

export default CourseNavigator;