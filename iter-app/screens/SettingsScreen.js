/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Text, View, Switch } from 'react-native';
import { SettingsStyles, SettingsStylesDark } from '../styles';
import { LightColors, DarkColors } from '../tools/Values';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Navbar } from '../components';

// Store Theme in Storage
async function storeTheme(value) {
    try {
        await AsyncStorage.setItem('@Theme', String(value));
    } catch(e) {
        console.log("Settings Theme Store Error: ", e);
    }
}

export default function SettingsScreen({ navigation }) {
    const [theme, setTheme] = useState(false);
    const Colors = theme ? DarkColors : LightColors;
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

    useFocusEffect(
        React.useCallback(() => {
            getTheme();
        }, [])
    );

    useEffect(() => {
        storeTheme(theme);
    }, [theme]);

    return (
        <View style={styles.main}>
            <Navbar title={"Settings"} navigation={navigation} theme={theme} hideMenu={true} />
            
            <View styles={styles.theme}>
                <Text style={styles.themeToggle}>Switch Theme</Text>
                <Switch
                    trackColor={{ false: Colors.text, true: Colors.blue }}
                    thumbColor={theme ? Colors.green : Colors.white}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => setTheme(!theme)}
                    value={theme}
                />
            </View>
        </View>
    );
}