import firestore from '@react-native-firebase/firestore';
import _ from 'lodash';

import { ErrorHandler } from '../components';
import { uploader } from './storage';
import { getResources, deleteResource } from './resources';

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
    try {
        let feed = [];
        const result = await firestore().collection('users').doc(studentId).get();
        const courses = await result.data().enrollments;
        if (!courses) return feed;
        await Promise.all(courses.map(async (course) => {
            const resources = await getResources(course.course);
            resources.forEach(res => {
                feed.push(res);
            })
        }));
        feed = _.reverse(_.sortBy(feed, ['created_at._seconds']))
        return feed;
    } catch (error) {
        ErrorHandler(error)
    }
}

const enrolledCourses = async (studentId) => {
    try {
        let myCourses = [];
        const result = await firestore().collection('users').doc(studentId).get();
        const enrollments = await result.data().enrollments;
        if (!enrollments) return myCourses;
        await Promise.all(enrollments.map(async (course) => {
            const res = await getCourse(course.course);
            myCourses.push(res)
        }));
        return myCourses;
    } catch (error) {
        ErrorHandler(error)
    }
}


const enrollCourse = async (courseId, studentId) => {
    try {
        if (await isEnrolled(courseId, studentId)) return;
        await firestore().collection('users').doc(studentId).update({
            enrollments: firestore.FieldValue.arrayUnion({
                course: courseId,
            }),
        });
        endpoint.doc(courseId).update({
            enrollments: firestore.FieldValue.arrayUnion({ student: studentId }),
        })
    } catch (error) {
        return ErrorHandler(error)
    }
}


const unEnrollCourse = async (courseId, studentId) => {
    try {
        await firestore().collection('users').doc(studentId).update({
            enrollments: firestore.FieldValue.arrayRemove({
                course: courseId,
            }),
        });
        endpoint.doc(courseId).update({
            enrollments: firestore.FieldValue.arrayRemove({ student: studentId }),
        })
    } catch (error) {
        return ErrorHandler(error)
    }
}

const deleteCourse = async (course, stateChange = null) => {

    try {
        // remove enrollments
        if (stateChange) stateChange("Unenrolling students...");
        const enrolled_students = await (await endpoint.doc(course.id).get()).data().enrollments;
        if (enrolled_students && enrolled_students.length > 0) {
            await Promise.all(enrolled_students.map(async ({ student }) => {
                await unEnrollCourse(course.id, student);
            }));
        }

        // remove resources
        if (stateChange) stateChange("Removing resources...");
        const resources = await getResources(course.id);
        if (resources && resources.length > 0) {
            await Promise.all(resources.forEach(async (resource) => {
                await deleteResource(resource.id, resource.fileName);
            }));
        }

        // remove course
        if (stateChange) stateChange("Deleting course...");
        await endpoint.doc(course.id).delete();
        if (stateChange) stateChange("Course deleted");
    } catch (error) {
        ErrorHandler(error);
    }
}


const isEnrolled = async (courseId, studentId) => {
    try {
        let courses = [];
        const result = await firestore().collection('users').doc(studentId).get();
        courses = result.data().enrollments;
        if (!courses) return false;
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

const getNewCourses = async () => {
    try {
        let courses = [];
        const result = await endpoint.limit(5).orderBy('created_at', 'desc').get();
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
    deleteCourse,
    enrollCourse,
    enrolledCourses,
    getCourse,
    getCourses,
    getCoursesFromTeacher,
    getNewCourses,
    getStudentFeed,
    isEnrolled,
    unEnrollCourse,
    updateCourse,
};