import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableWithoutFeedback, View, Image, ImageBackground, ActivityIndicator } from 'react-native'
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
import ImagePicker from 'react-native-image-picker';
import _ from 'lodash';
import images from '../config/images';
import useAuth from '../Services/useAuth';

const PermissionRequest = () => {
    requestMultiple([
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ])
        .then(
            (statuses) => {
                if (statuses["android.permission.CAMERA"] != "granted") alert("Camera access needed!")
                if (statuses["android.permission.READ_EXTERNAL_STORAGE"] != "granted") alert("Storage read access needed!")
                if (statuses["android.permission.WRITE_EXTERNAL_STORAGE"] != "granted") alert("Storage write access needed!")
            },
        ).catch(error => {
            alert("Error occured on user permissions.")
        });
}

const ImagePickerOptions = {
    title: 'Change profile picture',
    mediaType: "photos",
    quality: 0.7,
    storageOptions: {
        privateDirectory: true,
        skipBackup: true,
        path: 'images',
    },
};

const ProfilePicture = ({ user }) => {

    useEffect(() => {
        PermissionRequest();
    }, []);

    const auth = useAuth();

    const [isUploading, setIsUploading] = useState(false)

    const changeImage = () => {
        ImagePicker.showImagePicker(ImagePickerOptions, (response) => {
            if (!response.didCancel) uploadPicture(_.pick(response, ['type', 'fileName', 'uri']))
        });
    }

    const onSuccess = () => {
        setIsUploading(false);
    }

    const uploadPicture = async (image) => {
        setIsUploading(true);
        auth.updatePhoto(image.uri, image.fileName, onSuccess)
    }

    return (
        <TouchableWithoutFeedback onPress={changeImage}>
            <View style={styles.imageContainer}>
                {isUploading && <ActivityIndicator style={{ position: 'absolute', zIndex: 1 }} color="dodgerblue" size="large" />}
                {!auth.user.image && <Image style={styles.image} source={auth.user.userType == 'teacher' ? images.TEACHER_IMAGE : images.STUDENT_IMAGE} />}
                {auth.user.image && <Image style={styles.image} source={{ uri: auth.user.image }} />}
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ProfilePicture

const styles = StyleSheet.create({
    image: {
        width: 100,
        alignSelf: 'center',
        height: 100,
        borderRadius: 50,

    },
    imageContainer: {
        alignItems: "center",
        justifyContent: "center",
        alignSelf: 'center',
        marginBottom: 15,
    },
})
