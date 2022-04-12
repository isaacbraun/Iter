/* eslint-disable react/prop-types */
import React from 'react';
import { Text, View } from 'react-native';
import { SplashStyles as styles } from '../styles';

export default function SplashScreen() {
    return(
        <View style={styles.container}>
            <Text>Splash Screen</Text>
        </View>
    );
}