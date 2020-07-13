import firestore from '@react-native-firebase/firestore';

import { uploader, getPathForFirebaseStorage } from './storage';
import { ErrorHandler } from '../components';

const endpoint = firestore().collection('resources')
const resourceFolder = "/Resources/Course/";

const getResources = async (courseID) => {
    endpoint.where('course', '==', courseID).orderBy
}

const uploadResource = async (resource, onStateChange = null, onSuccess = null) => {
    try {
        let { fileName, uri } = resource.file;
        uri = await getPathForFirebaseStorage(uri);
        // console.log(fileName, uri);
        const successFunction = (downloadURL) => {
            endpoint.add({
                course: resource.course,
                title: resource.title,
                description: resource.description,
                fileName: fileName,
                url: downloadURL,
                created_at: firestore.Timestamp.now()
            });
            if (onSuccess) onSuccess(downloadURL);
        }
        const task = uploader(resourceFolder, uri, fileName, onStateChange, successFunction);
        return task;
    } catch (error) {
        ErrorHandler(error)
    }
}



export { uploadResource };