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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Navbar, PlanningInput } from '../components';
import { FlightPlanStyles as styles } from '../styles';
import { Colors } from '../tools/Values';

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

    const scrollRef = useRef();
    // scrollRef.current.scrollToEnd({ animated: true });

    const [mainPath, setMainPath] = useState([{speed: '', alti: ''}, null, null]);
    const [altPath, setAltPath] = useState([{speed: '', alti: ''}, null, null]);

    const [mainSpeed, setMainSpeed] = useState('');
    const [mainAlti, setMainAlti] = useState('');
    const [altSpeed, setAltSpeed] = useState('');
    const [altAlti, setAltAlti] = useState('');
    const [store, setStore] = useState(true);

    const handleSpeed = (speed) => {
        let tempArray = activePath ? mainPath : altPath;
        tempArray[0].speed = speed;
        activePath ? setMainPath(tempArray) : setAltPath(tempArray);
        setStore(!store);
    };
    const handleAlti = (alti) => {
        let tempArray = activePath ? mainPath : altPath;
        tempArray[0].alti = alti;
        activePath ? setMainPath(tempArray) : setAltPath(tempArray);
        setStore(!store);
    };

    const getPaths = async () => {
        try {
            const mainPath = await AsyncStorage.getItem('@MainPath');
            const altPath = await AsyncStorage.getItem('@AltPath');

            const mainParsed = JSON.parse(mainPath);
            const altParsed = JSON.parse(altPath);

            mainParsed !== null ? setMainPath(mainParsed) : null;
            altParsed !== null ? setAltPath(altParsed) : null;
            
            setMainSpeed(mainParsed !== null ? mainParsed[0].speed : '')
            setMainAlti(mainParsed != null ? mainParsed[0].alti : '')

            setAltSpeed(altParsed !== null ? altParsed[0].speed : '');
            setAltAlti(altParsed !== null ? altParsed[0].alti : '');
        } catch(e) {
            console.log("Search Read Error: ", e);
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
            setMainPath([{speed: '', alti: ''}, null, null]);
            setMainSpeed('');
            setMainAlti('');
            setStore(!store);
        } else {
            setAltPath([{speed: '', alti: ''}, null, null]);
            setAltSpeed('');
            setAltAlti('');
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

    const evaluate = () => {
        Alert.alert("Evaluate Pressed");
    };

    // Get Paths from Storage on Mount
    useEffect(() => {
        const fetchPaths = async () => {
            await getPaths();
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
                            <Text style={styles.inputText}>Cruise Altitude (ft)</Text>
                            <View style={styles.inputBoxContainer}>
                                <TextInput
                                    style={[styles.inputBox, styles.speedAltiInput]}
                                    value={activePath ? mainAlti : altAlti}
                                    onChangeText={(text) => {
                                        if (activePath) {
                                            setMainAlti(text);
                                            handleAlti(text);
                                        } else {
                                            setAltAlti(text);
                                            handleAlti(text);
                                        }
                                    }}
                                    keyboardType={'number-pad'}
                                    returnKeyType={ 'done' }
                                />
                            </View>
                        </View>
                    </View>

                    {/* Path Inputs */}
                    <KeyboardAwareScrollView
                        style={styles.inputsContainer}
                        keyboardDismissMode={false}
                        ref={scrollRef}
                    >
                        { activePath ?
                            mainPath.map((item, index) => {
                                if (index != 0) {
                                    return(
                                        <PlanningInput
                                            key={Math.random(index)}
                                            index={index}
                                            len={mainPath.length}
                                            item={item}
                                            value={item != null ? `${item.station_id[0]}: ${item.name}` : ''}
                                            start={index == 1}
                                            dest={index == mainPath.length - 1}
                                            select={select}
                                            add={add}
                                            remove={remove}
                                            clear={clear}
                                        />
                                    )
                                }
                            })
                            : 
                            altPath.map((item, index) => {
                                if (index != 0) {
                                    return(
                                        <PlanningInput
                                            key={Math.random(index)}
                                            item={item}
                                            value={item != null ? `${item.station_id[0]}: ${item.name}` : ''}
                                            index={index}
                                            len={altPath.length}
                                            start={index == 1}
                                            dest={index == altPath.length - 1}
                                            select={select}
                                            add={add}
                                            remove={remove}
                                            clear={clear}
                                        />
                                    )
                                }
                            })
                        }
                        {/* <View style={styles.inputsSpacer} /> */}
                    </KeyboardAwareScrollView>
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
                        style={[styles.button, {borderColor: Colors.blue}]}
                        onPress={() => evaluate()}
                    >
                        <Text style={[styles.buttonText, {color: Colors.blue}]}>Evaluate</Text>
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