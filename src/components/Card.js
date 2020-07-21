import React from 'react'
import { StyleSheet, TouchableWithoutFeedback, View, Image, ImageBackground } from 'react-native'
import colors from '../config/styles/colors';
import AppText from './AppText';

const Card = ({ description, titleStyles = { fontSize: 18, color: colors.WHITE, fontFamily: "Asap-SemiBold" }, title, subTitle, image, onPress }) => {

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <ImageBackground source={{ uri: image }} style={{ marginVertical: 10, overflow: "hidden", borderRadius: 5, width: "100%", aspectRatio: 16 / 9, height: "auto" }}>
                <TouchableWithoutFeedback onPress={onPress}>
                    <View style={{ flex: 1, justifyContent: "flex-end" }}>
                        <View style={styles.cardFooter}>
                            <AppText numberOfLines={1} style={{ ...styles.cardTitle, ...titleStyles }}>{title}</AppText>
                            {subTitle && <AppText style={styles.cardSubTitle}>(by {subTitle} )</AppText>}
                            {description && <AppText numberOfLines={2} style={styles.description}>{description}</AppText>}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );

}

export default Card

const styles = StyleSheet.create({

    cardFooter: {
        backgroundColor: "black",
        opacity: 0.9,
        padding: 10
    },
    cardImage: {
        width: '100%',
        height: "auto",
        aspectRatio: 16 / 9,
    },
    cardTitle: {
        fontFamily: "Asap-SemiBold",
        fontSize: 18,
        color: colors.WHITE,
        paddingRight: 6
    },
    cardSubTitle: {
        fontSize: 14,
        fontWeight: "normal",
        fontFamily: "Asap-Medium",
        marginTop: 3,
        color: colors.BLUE
    },
    description: {
        fontSize: 14,
        fontFamily: "Asap-Regular",
        marginTop: 3,
        color: colors.SECONDARY,
        paddingRight: 6
    },
    imageContainer: {
        width: "100%"
    }
})
