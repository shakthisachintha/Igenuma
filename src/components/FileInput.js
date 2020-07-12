import React, { useState } from 'react'
import { StyleSheet, Text, Alert, TouchableOpacity } from 'react-native'
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../config/styles/colors';

const FileInput = ({ onChangeFile }) => {

    const [file, setFile] = useState(false)

    const pickFile = async () => {
        try {
            const res = await DocumentPicker.pick();
            onChangeFile(res);
            setFile(res);
        } catch (error) {
            console.log(error);
        }
    }

    const handlePress = async () => {
        if (!file) pickFile();
        else {
            Alert.alert("Delete", "Are you sure you want to delete file?", [
                {
                    text: "Yes",
                    onPress: () => { onChangeFile(null); setFile(false) }
                }, {
                    text: "No"
                }
            ])
        }
    }

    return (
        <TouchableOpacity activeOpacity={0.85} style={styles.button} onPress={handlePress}>
            <Icon color="white" name="file" size={18} />
            <Text style={styles.btnText}>{!file ? "Pick a file" : file.name}</Text>
        </TouchableOpacity>
    )
}

export default FileInput

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        borderRadius: 25,
        backgroundColor: "black",
        alignItems: "center",
        marginVertical: 10,
        borderColor: colors.PRIMARY,
        borderWidth: 0.1,
        padding: 15,
        opacity: 0.9
    },
    btnText: {
        marginLeft: 10,
        color: "white",
        fontFamily: "Asap-Regular",
        textTransform: "uppercase",
        fontSize: 18
    },
})
