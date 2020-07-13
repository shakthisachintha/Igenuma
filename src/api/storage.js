import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob'
import { Platform } from 'react-native';

import { ErrorHandler } from '../components';


const uploader = (folder, sourceURI, fileName, onStateChange = null, onSuccess = null) => {
    const reference = storage().ref(`${folder}${fileName}`);
    const task = reference.putFile(sourceURI);
    task.on('state_changed', snapShot => {
        let progress = snapShot.bytesTransferred / snapShot.totalBytes;
        if (onStateChange) onStateChange(progress);
    });
    task.then(async () => {
        const url = await reference.getDownloadURL();
        if (onSuccess) onSuccess(url);
    });
    task.catch(error => { return ErrorHandler(error); })
    return task;
}

const getPathForFirebaseStorage = async (uri) => {
    try {
        const file = await RNFetchBlob.fs.stat(uri);
        return file.path
    } catch (error) {
        ErrorHandler(error);
    }
}

export { uploader, getPathForFirebaseStorage };