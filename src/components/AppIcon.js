import React from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const AppIcon = ({ iconColor = "#fff", size = 40, name, backgroundColor = '#000', onPress = null }) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={{
                backgroundColor,
                width: size,
                height: size,
                justifyContent: 'center',
                alignItems: "center",
                borderRadius: size / 2
            }}>
                <Icon name={name} size={size / 1.6} color={iconColor} />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default AppIcon


