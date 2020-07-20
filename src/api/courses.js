import firestore from '@react-native-firebase/firestore';
import _ from 'lodash';

import { ErrorHandler } from '../components';
import { uploader } from './storage';
import { getResources } from './resources';

const endpoint = firestore().collection('courses')
const imageFolder = "/Images/Course/";

const addCourseImage = (sourceURI, fileName, onStateChange = null, onSuccess = null) => {
    uploader(imageFolder, sourceURI, fileName, onStateChange, onSuccess)
}

const createCourse = async (values) => {
    try {
        const result = await endpoint.add({ ..._.pick(values, ["teacher", "name", "description"]), created_at: firestore.Timestamp.now() });
        const id = (await result.get()).id
        return id;
    } catch (error) {
        return ErrorHandler(error);
    }
}

const getStudentFeed = async (studentId) => {
    let feed = [];
    const result = await firestore().collection('users').doc(studentId).get();
    const courses = result.data().enrollments;
    if (!courses) return feed;
    courses.forEach(async (course) => {
        const resources = await getResources(course.id);
        feed.push(resources);
    });

}

const enrollCourse = async (courseId, studentId) => {
    try {
        if (await isEnrolled(courseId, studentId)) return;
        const result = firestore().collection('users').doc(studentId).update({
            enrollments: firestore.FieldValue.arrayUnion({
                course: courseId,
            }),
        });
    } catch (error) {
        return ErrorHandler(error)
    }
}

const unEnrollCourse = async (courseId, studentId) => {
    try {
        const result = firestore().collection('users').doc(studentId).update({
            enrollments: firestore.FieldValue.arrayRemove({
                course: courseId,
            }),
        });
    } catch (error) {
        return ErrorHandler(error)
    }
}

const isEnrolled = async (courseId, studentId) => {
    try {
        let courses = [];
        const result = await firestore().collection('users').doc(studentId).get();
        courses = result.data().enrollments;
        if (courses.length == 0) return false;
        else return (courses.some(course => course['course'] == courseId));
    } catch (error) {
        return ErrorHandler(error)
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
        const result = await endpoint.where("teacher.id", "==", teacherID).orderBy('created_at', 'desc').get();
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
        result.forEach(async (doc) => {
            let course = doc.data();
            course.id = doc.id;
            courses.push(course);
        });
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


export {
    addCourseImage,
    createCourse,
    enrollCourse,
    getCourse,
    getCourses,
    getCoursesFromTeacher,
    isEnrolled,
    unEnrollCourse,
    updateCourse,
};