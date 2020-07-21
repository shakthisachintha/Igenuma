import firestore from '@react-native-firebase/firestore';
import _ from 'lodash';
import { uploader, getPathForFirebaseStorage, deleteFile } from './storage';
import { ErrorHandler } from '../components';

const endpoint = firestore().collection('resources')
const resourceFolder = "/Resources/Course/";

const getResources = async (courseID) => {
    try {
        let resources = [];
        const result = await endpoint.where('course.id', '==', courseID).orderBy('created_at', 'desc').get();
        result.forEach(doc => {
            resources.push({ ...doc.data(), id: doc.id });
        })
        return resources;
    } catch (error) {
        ErrorHandler(error)
    }

}

const deleteResource = async (resourceID, fileName) => {
    try {
        await endpoint.doc(resourceID).delete();
        await deleteFile(`${resourceFolder}${fileName}`);
    } catch (error) {
        ErrorHandler(error);
    }

}

const uploadResource = async (resource, onStateChange = null, onSuccess = null) => {
    try {
        let { fileName, uri } = resource.file;
        const realPath = await getPathForFirebaseStorage(uri);
        if (!realPath) return false
        else {
            const successFunction = (downloadURL) => {
                endpoint.add({
                    course: { id: resource.course.id, name: resource.course.name },
                    title: resource.title,
                    description: resource.description,
                    fileName: fileName,
                    url: downloadURL,
                    created_at: firestore.Timestamp.now()
                });
                if (onSuccess) onSuccess(downloadURL);
            }
            const task = uploader(resourceFolder, realPath, fileName, onStateChange, successFunction);
            return task;
        }
    } catch (error) {
        ErrorHandler(error);
    }
}



export { uploadResource, getResources, deleteResource };