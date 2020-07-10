import React, { useState, useEffect } from 'react'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { useFormikContext } from 'formik';

import { StyleSheet, View } from 'react-native'
import AppText from '../AppText';

const AppFormRadioButton = ({ title, buttons, name, initial }) => {

    const { setFieldValue } = useFormikContext();

    const [selected, setSelected] = useState(initial);

    const onPress = (val) => {
        setSelected(val);
        setFieldValue(name, val);
    }

    return (
        <View style={styles.container}>
            <AppText style={styles.title}>{title}</AppText>
            <RadioForm
                formHorizontal={true}
                initial={selected}
            >
                {
                    buttons.map((obj, i) => (
                        <RadioButton labelHorizontal={true} key={i} >
                            {/*  You can set RadioButtonLabel before RadioButtonInput */}
                            <RadioButtonInput
                                obj={obj}
                                index={i}
                                isSelected={selected === obj.value}
                                onPress={() => onPress(obj.value)}
                                borderWidth={2}
                                buttonInnerColor={'black'}
                                buttonOuterColor={'black'}
                                buttonSize={15}
                                buttonOuterSize={25}
                                buttonStyle={{ marginRight: 0 }}
                                buttonWrapStyle={{ marginLeft: 7 }}
                            />
                            <RadioButtonLabel
                                obj={obj}
                                index={i}
                                labelHorizontal={true}
                                onPress={() => onPress(obj.value)}
                                labelStyle={{ fontSize: 18, color: 'black', marginRight: 30 }}
                                labelWrapStyle={{}}
                            />
                        </RadioButton>
                    ))
                }
            </RadioForm>
        </View>
    )
}

export default AppFormRadioButton

const styles = StyleSheet.create({
    container: {
        marginVertical: 15
    },
    title: {
        fontSize: 20,
        marginLeft: 7,
        marginBottom: 15
    }
})
