import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native'
import useAuth from '../Services/useAuth';
import images from '../config/images';


const WelcomeScreen = ({ navigation }) => {

    const auth = useAuth();

    const loading = () => {
        setTimeout(() => {
            if (!auth.user) {
                navigation.navigate('Login')
            }
        }, 1500);
    }

    useEffect(() => {
        loading();
    }, [])

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={images.LOGO_ENGLISH} />
            {!auth.isLoading && <ActivityIndicator style={{ marginTop: 20 }} color="black" />}
            <Text style={styles.text}>Igenuma e-Learning</Text>
        </View>
    );

}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        height: 65,
        width: 230
    },
    text: {
        position: "absolute",
        bottom: 35,
        alignContent: "flex-end",
        fontFamily: "Asap-Regular",
        fontSize: 20
    }
})
