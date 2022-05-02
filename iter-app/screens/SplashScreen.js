/* eslint-disable react/prop-types */
import React from 'react';
import { Image, View } from 'react-native';
import { SplashStyles as styles } from '../styles';
import logo from '../assets/iter.png';

export default function SplashScreen() {
    return(
        <View style={styles.container}>
            <Image source={logo} />
        </View>
    );
}