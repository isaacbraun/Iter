/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Text, View, Pressable, Switch } from 'react-native';
import { SettingsStyles, SettingsStylesDark } from '../styles';
// import { LightColors, DarkColors } from '../tools/Values';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

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
    // const Colors = theme ? DarkColors : LightColors;
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
        <View style={styles.container}>
            <Text>Settings</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={theme ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setTheme(!theme)}
                value={theme}
            />
            <Pressable onPress={() => navigation.navigate('Home')}>
                <Text>Go to Home</Text>
            </Pressable>
        </View>
    );
}