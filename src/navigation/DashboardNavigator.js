import React from 'react'
import {
    createDrawerNavigator, DrawerContentScrollView,
    DrawerItemList
} from "@react-navigation/drawer"
import { View } from 'react-native';


import { AppIcon } from '../components';
import colors from '../config/styles/colors';
import DashboardScreen from '../screens/DashboardScreen';
import DrawerHeader from './DrawerHeader';
import { MyCoursesScreen, CoursesScreen } from '../screens/Student';
import CreateCourseScreen from '../screens/Teacher/CreateCourseScreen';
import ManageCoursesScreen from '../screens/Teacher/ManageCoursesScreen';
import CourseNavigator from './CourseNavigator';


const Drawer = createDrawerNavigator();
const DashboardNavigator = () => (

    <Drawer.Navigator drawerStyle={{ opacity: 0.85, width: "65%" }} drawerContent={customDrawer} initialRouteName="Home">
        <Drawer.Screen options={{ drawerLabel: "Home", drawerIcon: ({ size, color }) => <AppIcon name="home" size={size + 5} iconColor={color} backgroundColor="white" /> }} name="Dashboard" component={DashboardScreen} />
        <Drawer.Screen options={{ drawerLabel: "Courses", drawerIcon: ({ size, color }) => <AppIcon name="book-search" size={size + 5} iconColor={color} backgroundColor="white" /> }} name="Courses" component={CoursesScreen} />
        <Drawer.Screen options={{ drawerLabel: "Enrolled Courses", drawerIcon: ({ size, color }) => <AppIcon name="book-open-page-variant" size={size + 5} iconColor={color} backgroundColor="white" /> }} name="MyCourses" component={MyCoursesScreen} />
        <Drawer.Screen options={{ drawerLabel: "Create Course", drawerIcon: ({ size, color }) => <AppIcon name="book-plus-multiple" size={size + 5} iconColor={color} backgroundColor="white" /> }} name="CreateCourseScreen" component={CreateCourseScreen} />
        <Drawer.Screen options={{ drawerLabel: "Manage Courses", drawerIcon: ({ size, color }) => <AppIcon name="file-cog" size={size + 5} iconColor={color} backgroundColor="white" /> }} name="ManageCourses" component={CourseNavigator} />
    </Drawer.Navigator>
)

const customDrawer = (props) => {
    return (
        <DrawerContentScrollView stickyHeaderIndices={[0]} style={{ backgroundColor: "black", paddingTop: 30 }} {...props}>
            <DrawerHeader />
            <View>
                <DrawerItemList labelStyle={{ color: colors.WHITE }} {...props} />
            </View>
        </DrawerContentScrollView>
    )
}

export default DashboardNavigator;
