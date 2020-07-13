import firestore from '@react-native-firebase/firestore';
import _ from 'lodash';
import { uploader, getPathForFirebaseStorage, deleteFile } from './storage';
import { ErrorHandler } from '../components';

const endpoint = firestore().collection('resources')
const resourceFolder = "/Resources/Course/";

const getResources = async (courseID) => {
    try {
        let resources = [];
        const result = await endpoint.where('course', '==', courseID).orderBy('created_at', 'desc').get();
        result.forEach(doc => {
            resources.push({ ...doc.data(), id: doc.id });
        })
        console.log(resources);
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



export { uploadResource, getResources, deleteResource };