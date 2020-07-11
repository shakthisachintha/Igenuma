import React from 'react'
import { StyleSheet, Text, View, Modal } from 'react-native'

import * as Progress from 'react-native-progress';
import LottieView from 'lottie-react-native';

import { AppText } from '../components'

const UploadScreen = ({ onDone, indeterminate = false, progress = 0, visible = false }) => {
    return (
        <Modal visible={visible}>
            <View style={styles.container}>
                {
                    progress < 1 ?
                        (<View><Progress.Circle indeterminate={indeterminate} color="black" strokeCap="round" thickness={3} size={100} showsText={true} progress={progress} /><AppText style={{ marginTop: 20 }}>Creating course...</AppText></View>)
                        :
                        (<LottieView onAnimationFinish={onDone} autoPlay={true} hardwareAccelerationAndroid={true} loop={false} source={require('../assets/animations/done.json')} />)
                }
            </View>
        </Modal>
    )
}

export default UploadScreen

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center"
    }
})
