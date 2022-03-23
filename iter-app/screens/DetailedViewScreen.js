import React from 'react';
import {
    Text,
    View,
    Pressable,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { DetailedViewStyles as styles } from '../styles';
import Navbar from '../components/Navbar';

export default function DetailedViewScreen({ route, navigation }) {
    const { data } = route.params;

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.main}>
                {/* Navbar */}
                <Navbar title={"Decoded Details"} navigation={navigation} />
                
                
            </View>
        </TouchableWithoutFeedback>
    )
};