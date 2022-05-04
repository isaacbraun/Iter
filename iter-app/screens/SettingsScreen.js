/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from 'react';
import { Text, View, Pressable } from 'react-native';
import { SettingsStyles, SettingsStylesDark } from '../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Navbar } from '../components';

// Store Theme in Storage
async function storeItem(name, value) {
    try {
        await AsyncStorage.setItem(name, String(value));
    } catch(e) {
        console.log("Settings Theme Store Error: ", e);
    }
}

export default function SettingsScreen({ navigation }) {
    const [theme, setTheme] = useState(false);
    const [metarType, setMetarType] = useState(true);
    const styles = theme ? SettingsStylesDark : SettingsStyles;
        
    // Get Theme from Storage
    const getTheme = async () => {
        try {
            const theme = await AsyncStorage.getItem('@Theme');
            theme != null ? setTheme(theme === 'true') : null;
        } catch(e) {
            console.log("SettingsScreen Theme Read Error: ", e);
        }
    };

    // Get MetarType from Storage
    const getMetarType = async () => {
        try {
            const metarType = await AsyncStorage.getItem('@MetarType');
            metarType != null ? setMetarType(metarType === 'true') : null;
        } catch(e) {
            console.log("HomeScreen MetarType Read Error: ", e);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            getTheme();
            getMetarType();
        }, [])
    );

    const modified = useRef(false);
    useEffect(() => {
        if (modified.current) {
            storeItem('@Theme', theme);
            storeItem('@MetarType', metarType);
        } else {
            modified.current = true;
        }
    }, [theme, metarType]);

    return (
        <View style={styles.main}>
            <Navbar title={"Settings"} navigation={navigation} theme={theme} hideMenu={true} />
            
            <View style={styles.inner}>
                <View style={styles.settingItemContainer}>
                    <Text style={styles.settingItemText}>Color Theme</Text>
                    <View style={styles.switch}>
                        <Pressable
                            style={[
                                styles.pathButton,
                                styles.pathButtonLeft,
                                theme ? styles.active : null
                            ]}
                            onPress={() => setTheme(true) }
                        >
                            <Text style={[styles.pathButtonText, theme ? styles.pathActiveText : null]}>
                                Dark
                            </Text>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.pathButton,
                                styles.pathButtonRight,
                                !theme ? styles.active : null
                            ]}
                            onPress={() => setTheme(false) }
                        >
                            <Text style={[styles.pathButtonText, !theme ? styles.pathActiveText : null]}>
                                Light
                            </Text>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.settingItemContainer}>
                    <Text style={styles.settingItemText}>
                        Default Station Display Type
                    </Text>
                    <View style={styles.switch}>
                        <Pressable
                            style={[
                                styles.pathButton,
                                {borderTopLeftRadius: 3, borderBottomLeftRadius: 3, borderRightWidth: 0},
                                metarType ? styles.active : null
                            ]}
                            onPress={() => setMetarType(true) }
                        >
                            <Text style={[styles.pathButtonText, metarType ? styles.pathActiveText : null]}>Full</Text>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.pathButton,
                                {borderTopRightRadius: 3, borderBottomRightRadius: 3, borderLeftWidth: 0},
                                !metarType ? styles.active : null
                            ]}
                            onPress={() => setMetarType(false) }
                        >
                            <Text style={[styles.pathButtonText, !metarType ? styles.pathActiveText : null]}>Reduced</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
}