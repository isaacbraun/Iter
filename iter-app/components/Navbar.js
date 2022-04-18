/* eslint-disable react/prop-types */
import React from 'react';
import {
    Text,
    View,
    Pressable,
} from 'react-native';
import { NavbarStyles as styles } from '../styles';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Colors } from '../tools/Values';

export default function Navbar(props) {
    return (
        <View style={styles.navbar}>
            <View style={styles.navbarInner}>
                <Pressable
                    style={styles.navbarButton}
                    onPress={() => props.navigation.navigate('Home')}
                >
                    <Ionicons name="ios-arrow-back" size={24} color={Colors.blue} />
                </Pressable>
                <Text style={styles.navbarText}>{props.title}</Text>
                <Pressable
                    style={styles.navbarButton}
                    onPress={() => props.navigation.navigate('Settings')}
                >
                    <Feather name="menu" size={24} color={ Colors.text } />
                </Pressable>
            </View>
        </View>
    )
}