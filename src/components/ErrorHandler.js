import { Alert } from "react-native";

export default function (error) {
    console.log(error.message);
    return Alert.alert('Bad Happend!', error.message)
}


