/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from 'react';
import {
    Text,
    View,
    Pressable,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { Navbar, PlanningInputs } from '../components';
import { FlightPlanStyles as styles } from '../styles';
import { Colors } from '../tools/Values';
import { dateTimeString } from '../tools/Tools';
import { pathsMatch, compare } from '../tools/Compare';

export default function FlightPlanScreen({ navigation }) {
    const [activePath, setActivePath] = useState(true);
    const pathSwitch = (pressed) => {
        if (pressed == 'main' && !activePath) {
            setActivePath(true);
        }
        else if (pressed == 'alt' && activePath) {
            setActivePath(false);
        }
    };

    const [mainPath, setMainPath] = useState([{speed: '', date: null}, null, null]);
    const [altPath, setAltPath] = useState([{speed: '', date: null}, null, null]);

    const [mainSpeed, setMainSpeed] = useState('');
    const [mainDate, setMainDate] = useState(new Date());
    const [altSpeed, setAltSpeed] = useState('');
    const [altDate, setAltDate] = useState(new Date());
    const [store, setStore] = useState(true);

    const handleSpeed = (speed) => {
        let tempArray = activePath ? mainPath : altPath;
        tempArray[0].speed = speed;
        activePath ? setMainPath(tempArray) : setAltPath(tempArray);
        setStore(!store);
    };

    const [dateModalVisible, setDateModalVisible] = useState(false);
    const handleDateConfirm = (date) => {
        activePath ? setMainDate(date) : setAltDate(date);

        let tempArray = activePath ? mainPath : altPath;
        tempArray[0].date = date;
        activePath ? setMainPath(tempArray) : setAltPath(tempArray);
        setStore(!store);

        setDateModalVisible(false);
    };

    const getPaths = async () => {
        try {
            const mainPath = await AsyncStorage.getItem('@MainPath');
            const altPath = await AsyncStorage.getItem('@AltPath');

            const mainParsed = JSON.parse(mainPath);
            const altParsed = JSON.parse(altPath);

            mainParsed !== null ? setMainPath(mainParsed) : null;
            altParsed !== null ? setAltPath(altParsed) : null;
            
            if (mainParsed !== null) {
                setMainSpeed(mainParsed[0].speed);
                setMainDate(mainParsed[0].date !== null ? mainParsed[0].date : new Date());
            }
            if (altParsed !== null) {
                setAltSpeed(altParsed[0].speed);
                setAltDate(altParsed[0].date !== null ? altParsed[0].date : new Date());
            }
        } catch(e) {
            console.log("Flight Plan Read Error: ", e);
        }
    };
    
    const storeArray = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
            console.log("Store Write Error: ", e);
        }
    };
    
    const insert = (arr, index, newItem) => [...arr.slice(0, index), newItem, ...arr.slice(index)];

    const replace = (arr, index, newItem) => {
        let tempArray = arr;
        tempArray[index] = newItem;
        return tempArray;
    };

    const select = (item, index) => {
        activePath ? setMainPath(replace(mainPath, index, item)) : setAltPath(replace(altPath, index, item));
        setStore(!store);
    };

    const add = (index) => {
        activePath ? setMainPath(insert(mainPath, index, null)) : setAltPath(insert(altPath, index, null));
        setStore(!store);
    };

    const remove = (index) => {
        activePath ?
            setMainPath([
                ...mainPath.slice(0, index),
                ...mainPath.slice(index + 1)
            ])
            : 
            setAltPath([
                ...altPath.slice(0, index),
                ...altPath.slice(index + 1)
            ])
        setStore(!store);
    };

    const clear = (index) => {
        activePath ? setMainPath(replace(mainPath, index, null)) : setAltPath(replace(altPath, index, null));
        setStore(!store);
    }

    const reset = () => {
        if (activePath) {
            setMainPath([{speed: '', date: null}, null, null]);
            setMainSpeed('');
            setMainDate(new Date());
            setStore(!store);
        } else {
            setAltPath([{speed: '', date: null}, null, null]);
            setAltSpeed('');
            setAltDate(new Date());
            setStore(!store);
        }
    };

    const view = () => {
        if (mainPath.includes(null)) {
            Alert.alert("All Main Path Inputs Must Have Values");
            return;
        }

        if (altPath.length == 3) {
            if ((altPath[1] != null && altPath[2] == null) || (altPath[1] == null && altPath[2] != null)) {
                Alert.alert("All Alternate Path Inputs Must Have Values");
                return;
            }
            else if (altPath[1] == null && altPath[2] == null) {
                navigation.navigate("Home", { view: true, paths: 1 });
                return;
            }
        }
        else if (altPath.length != 3) {
            if (altPath.includes(null)) {
                Alert.alert("All Alternate Path Inputs Must Have Values");
                return;
            }
        }

        navigation.navigate("Home", { view: true, paths: 2 });
    };

    // Get Paths from Storage on Mount
    useEffect(() => {
        const fetchPaths = async () => {
            // await AsyncStorage.removeItem('@MainPath');
            // await AsyncStorage.removeItem('@AltPath');
            await getPaths();
            console.log(mainPath[0])
            console.log(mainDate)
        }

        fetchPaths();
    }, []);

    // Store Path After Any Modification
    const userInput = useRef(false);
    useEffect(() => {
        if (userInput.current) {
            storeArray(activePath ? '@MainPath' : '@AltPath', activePath ? mainPath : altPath);
        } else {
            userInput.current = true;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store]);

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.main}>
                {/* Main Inner Path Container */}
                <View style={styles.inner}>

                    {/* Navbar */}
                    <Navbar title={"Chart Paths"} navigation={navigation} />

                    {/* Path Toggle Switch */}
                    <View style={styles.pathSwitch}>
                        <Pressable
                            style={[
                                styles.pathButton,
                                {borderTopLeftRadius: 3, borderBottomLeftRadius: 3, borderRightWidth: 0},
                                !activePath ? styles.altActive : null
                            ]}
                            onPress={() => pathSwitch('alt') }
                        >
                            <Text style={[styles.pathButtonText, !activePath ? styles.pathActiveText : null]}>Alternate Path</Text>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.pathButton,
                                {borderTopRightRadius: 3, borderBottomRightRadius: 3, borderLeftWidth: 0},
                                activePath ? styles.mainActive : null
                            ]}
                            onPress={() => pathSwitch('main') }
                        >
                            <Text style={[styles.pathButtonText, activePath ? styles.pathActiveText : null]}>Main Path</Text>
                        </Pressable>
                    </View>

                    {/* Path Aircraft Info */}
                    <View style={styles.speedAlti}>
                        <View style={styles.speedAltiInner}>
                            <Text style={styles.inputText}>Cruise Speed (kts)</Text>
                            <View style={styles.inputBoxContainer}>
                                <TextInput
                                    style={[styles.inputBox, styles.speedAltiInput]}
                                    value={activePath ? mainSpeed : altSpeed}
                                    onChangeText={(text) => {
                                        if (activePath) {
                                            setMainSpeed(text);
                                            handleSpeed(text);
                                        } else {
                                            setAltSpeed(text);
                                            handleSpeed(text);
                                        }
                                    }}
                                    keyboardType={'number-pad'}
                                    returnKeyType={ 'done' }
                                />
                            </View>
                        </View>
                        <View style={{width: 15}} />
                        <View style={styles.speedAltiInner}>
                            <Text style={styles.inputText}>Departure Time</Text>
                            <Pressable
                                style={styles.date}
                                onPress={() => {
                                    setDateModalVisible(true);
                                }}
                            >
                                <Text style={styles.dateText}>
                                    {activePath ?
                                        mainDate ? dateTimeString(mainDate) : null
                                        :
                                        altDate ? dateTimeString(altDate) : null
                                    }
                                </Text>
                            </Pressable>
                        </View>

                        <DateTimePickerModal
                            isVisible={dateModalVisible}
                            themeVariant="light"
                            isDarkModeEnabled={false}
                            display="inline"
                            minuteInterval={5}
                            mode={'datetime'}
                            date={activePath ? mainDate : altDate}
                            onConfirm={handleDateConfirm}
                            onCancel={() => setDateModalVisible(false)}
                        />
                    </View>

                    {/* Path Inputs */}
                    <PlanningInputs
                        pathArray={activePath ? mainPath : altPath}
                        select={select}
                        add={add}
                        remove={remove}
                        clear={clear}
                    />
                </View>

                {/* Bottom Action Buttons */}
                <View style={styles.bottom}>
                    <Pressable
                        style={[styles.button, {borderColor: Colors.red}]}
                        onPress={() => reset()}
                    >
                        <Text style={[styles.buttonText, {color: Colors.red}]}>Reset</Text>
                    </Pressable>
                    <Pressable
                        style={[
                            styles.button,
                            {borderColor: Colors.blue},
                            !pathsMatch(mainPath, altPath, false) ? styles.disabled : null
                        ]}
                        onPress={() => pathsMatch(mainPath, altPath, true) ? compare(mainPath, altPath) : null}
                    >
                        <Text
                            style={[
                                styles.buttonText,
                                {color: Colors.blue},
                                !pathsMatch(mainPath, altPath, false) ? {color: Colors.text} : null
                            ]}
                        >Compare</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, {borderColor: Colors.blue, backgroundColor: Colors.blue}]}
                        onPress={() => view()}
                    >
                        <Text style={[styles.buttonText, {color: Colors.background}]}>View</Text>
                    </Pressable>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}