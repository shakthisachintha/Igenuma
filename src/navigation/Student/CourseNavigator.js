import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { DrawerActions } from '@react-navigation/native';

import { AppIcon, AppHeader } from '../../components';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { CoursesScreen, CourseViewScreen } from '../../screens/Student/';

const Stack = createStackNavigator();

// const navigation = useNavigation();


const headerLeft = (navigation) => {
    return (
        <TouchableWithoutFeedback onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <AppIcon name="format-list-bulleted" iconColor="black" backgroundColor="transparent" />
        </TouchableWithoutFeedback>
    )
}

// screenOptions = {({ navigation, route }) => ({ headerLeft: () => headerLeft(navigation), headerTransparent: false, headerStyle: { backgroundColor: "white" }, headerTitleStyle: { fontFamily: "Asap-Regular", alignSelf: "flex-end" }, gestureEnabled: true, headerTintColor: "black" })} 

const CourseNavigator = () => (

    <Stack.Navigator mode="modal" screenOptions={{
        header: ({ navigation, scene }) => { return <AppHeader title={scene.route.params.course.name} navigation={navigation} /> }
    }}>

        <Stack.Screen
            name="Courses"
            component={CoursesScreen}
            options={{
                headerShown: false,
            }}
        />

        <Stack.Screen
            name="CourseOverview"
            component={CourseViewScreen}
            options={({ route }) => ({ title: route.params.course.name })}
        />

    </Stack.Navigator>
)

export default CourseNavigator;