import React from 'react'
import { Text, View, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PressableIcon = ({ iconColor = "#fff", size = 40, name, backgroundColor = '#000', onPress }) => {
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
                <Icon name={name} size={size} color={iconColor} />
            </View>
        </TouchableWithoutFeedback>

    )
}

export default PressableIcon

