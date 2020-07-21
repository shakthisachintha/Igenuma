import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, Linking } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import AppIcon from './AppIcon'
import AppText from './AppText'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from '../config/styles/colors'
import moment from 'moment';

const ResourceCard = ({ resourceTitle, createdAt, leftAction, resourceDesc, courseName, fileURI, fileName, rightAction }) => {

    const openLink = async (uri) => {
        const supported = await Linking.canOpenURL(uri);
        if (supported) {
            Linking.openURL(uri);
        }
    }

    return (

        <TouchableWithoutFeedback onPress={() => openLink(fileURI)}>
            <View style={styles.container}>
                <Swipeable overshootFriction={9} enabled={rightAction ? true : false} friction={4} containerStyle={styles.swipeContainer} renderRightActions={rightAction} >
                    <View style={styles.cardBody}>
                        {courseName && <AppText style={styles.cardTitle}>{courseName}</AppText>}
                        {resourceTitle && <AppText style={styles.cardSubTitle}>{resourceTitle}</AppText>}
                        {resourceDesc != "" && <AppText style={styles.description}>{resourceDesc}</AppText>}

                        {fileName &&
                            (<View style={styles.fileNameContainer}>
                                <Icon name="paperclip" size={16} />
                                <AppText style={styles.description}>{fileName}</AppText>
                            </View>)
                        }
                        <AppText style={{ fontFamily: 'Asap-Regular', fontSize: 14, marginTop: 2, alignSelf: "flex-end", color: "gray" }}>{moment(createdAt._seconds * 1000).fromNow()}</AppText>
                    </View>
                </Swipeable>
            </View>
        </TouchableWithoutFeedback>

    )
}

export default ResourceCard

const styles = StyleSheet.create({
    cardBody: {
        borderRadius: 10,
        marginVertical: 10,
        padding: 2,
        overflow: "hidden",
    },
    swipeContainer: {
        backgroundColor: "white",
        borderRadius: 10,
        paddingHorizontal: 10
    },
    container: {
        marginVertical: 10,
        padding: 5,
        // backgroundColor: colors.WHITE,
    },
    fileNameContainer: {
        flexDirection: "row",
        alignItems: "baseline"
    },
    cardTitle: {
        fontFamily: "Asap-SemiBold",
        fontSize: 22,
        color: colors.black
    },
    cardSubTitle: {
        fontSize: 18,
        fontWeight: "normal",
        fontFamily: "Asap-Medium",
        marginTop: 3,
        color: colors.BLUE
    },

    description: {
        fontSize: 16,
        fontFamily: "Asap-Regular",
        marginTop: 3,
        color: colors.SECONDARY
    },

})
