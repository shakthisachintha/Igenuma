import React from 'react'
import { StyleSheet, TouchableWithoutFeedback, View, Image } from 'react-native'
import colors from '../config/styles/colors';
import AppText from './AppText';

const Card = ({ description, title, subTitle, image, onPress }) => {
    return (
        <TouchableWithoutFeedback style={styles.container} onPress={onPress}>
            <View style={styles.cardBody}>
                {image && (<View style={styles.imageContainer}>
                    <Image source={{ uri: image }} style={styles.cardImage} />
                </View>)}


                <View style={styles.cardFooter}>
                    <AppText style={styles.cardTitle}>{title}</AppText>
                    {subTitle && <AppText style={styles.cardSubTitle}>(by {subTitle} )</AppText>}
                    {description && <AppText style={styles.description}>{description}</AppText>}
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Card

const styles = StyleSheet.create({
    cardBody: {
        borderRadius: 10,
        marginVertical: 15,
        backgroundColor: colors.WHITE,
        // flexDirection: "row",
        overflow: "hidden",
        // borderColor: "black",
        // borderWidth: 2

    },
    cardFooter: {
        justifyContent: "center",
        paddingBottom: 15,
        paddingTop: 15,
        paddingLeft: 15
    },
    cardImage: {
        width: '100%',
        height: "auto",
        aspectRatio: 16 / 9,
    },
    cardTitle: {
        fontFamily: "Asap-SemiBold",
        fontSize: 22,
        color: colors.black
    },
    cardSubTitle: {
        fontSize: 14,
        fontWeight: "normal",
        fontFamily: "Asap-Medium",
        marginTop: 3,
        color: colors.BLUE
    },
    container: {
        marginVertical: 20
    },
    description: {
        fontSize: 16,
        fontFamily: "Asap-Regular",
        marginTop: 3,
        color: colors.SECONDARY
    },
    imageContainer: {
        width: "100%"
    }
})
