import { Alert } from "react-native";

export default function (error) {
    console.log(error.message);
    Alert.alert('Bad Happend!', error.message)
}


