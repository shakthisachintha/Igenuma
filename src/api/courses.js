import React from 'react'
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import _ from 'lodash';
import { ErrorHandler } from '../components';

const endpoint = firestore().collection('courses')
const imageFolder = "/Images/Course/";

const addCourseImage = (sourceURI, fileName, onStateChange = null, onSuccess = null) => {
    const reference = storage().ref(`${imageFolder}${fileName}`);
    const task = reference.putFile(sourceURI);
    task.on('state_changed', snapShot => {
        let progress = snapShot.bytesTransferred / snapShot.totalBytes;
        onStateChange(progress);
    });
    task.then(async () => {
        const url = await reference.getDownloadURL();
        onSuccess(url);
    });
    task.catch(error => { return ErrorHandler(error); })
    return task;
}


const createCourse = async (values) => {
    try {
        console.log(values);
        const result = await endpoint.add(_.pick(values, ["teacher", "name", "description"]));
        const id = (await result.get()).id
        return id;
    } catch (error) {
        return ErrorHandler(error);
    }
}

const getCourse = async (id) => {
    try {
        const results = await endpoint.doc(id).get();
        if (!results.exists) return null;
        const data = results.data();
        const meta = results.id
        return _.extend(data, { id });
    } catch (error) {
        return ErrorHandler(error);
    }
}
const getCoursesFromTeacher = async (teacherID) => {
    try {
        let courses = [];
        const result = await endpoint.where("teacher.id", "==", teacherID).get();
        result.forEach(doc => {
            let course = doc.data();
            course.id = doc.id;
            courses.push(course);
        })
        return courses;
    } catch (error) {
        return ErrorHandler(error);
    }
}

const getCourses = async () => {
    try {
        let courses = [];
        const result = await endpoint.get();
        result.forEach(doc => {
            let course = doc.data();
            course.id = doc.id;
            courses.push(course);
        })
        return courses;
    } catch (error) {
        return ErrorHandler(error);
    }
}

const updateCourse = async (docID, values) => {
    try {
        const resp = await endpoint.doc(docID).update(values);
        const course = await getCourse(docID);
        return course;
    } catch (error) {
        return ErrorHandler(error);
    }
}


export { createCourse, updateCourse, addCourseImage, getCourses, getCourse, getCoursesFromTeacher };