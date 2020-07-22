import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, Image, Alert } from 'react-native'
import ImagePicker from 'react-native-image-picker';

import colors from '../config/styles/colors'
import AppIcon from './AppIcon'

import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
import { AppText } from '.';

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

const options = {
    title: 'Select Course Image',
    mediaType: "photos",
    quality: 0.7,
    storageOptions: {
        privateDirectory: true,
        skipBackup: true,
        path: 'images',
    },
};


const ImageInput = ({ imageURI, onChangeImage }) => {


    useEffect(() => {
        PermissionRequest();
    }, [])

    const handlePress = () => {
        if (!imageURI) openPicker();
        else Alert.alert("Delete", "Are you sure you want to delete image?", [
            {
                text: "Yes",
                onPress: () => onChangeImage(null)
            }, {
                text: "No"
            }
        ])
    }

    const openPicker = () => {
        ImagePicker.showImagePicker(options, (response) => {
            if (!response.didCancel) onChangeImage(response.uri)
        });
    }

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={{ ...styles.container }}>
                {!imageURI && <AppIcon name="camera" backgroundColor="transparent" iconColor="black" size={50} />}
                {!imageURI && <AppText style={{ fontSize: 18, fontFamily: "Asap-Regular" }}>Select a picture</AppText>}
                {imageURI && <Image source={{ uri: imageURI }} style={styles.image} />}
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ImageInput

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: "row",
        borderColor: "black",
        borderWidth: 0.1,
        // height: 100,
        width: 320,
        borderRadius: 10,
        marginBottom: 10,
        // justifyContent: 'center',
        overflow: "hidden",
    },
    image: {
        height: "auto",
        width: "100%",
        aspectRatio: 16 / 9
    }
})
