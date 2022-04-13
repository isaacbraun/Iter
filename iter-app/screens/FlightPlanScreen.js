/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    Pressable,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../components/Navbar';
import PlanningInput from '../components/PlanningInput';
import { FlightPlanStyles as styles } from '../styles';
import { Colors } from '../components/Values';

export default function FlightPlanScreen({ navigation }) {
    const [activePath, setActivePath] = useState(true);

    const [mainPath, setMainPath] = useState([{speed: '', alti: ''}, {}, {}]);
    const [altPath, setAltPath] = useState([{speed: '', alti: ''}, {}, {}]);
    const [speed, setSpeed] = useState('');
    const [alti, setAlti] = useState('');

    const getData = async () => {
        try {
            const mainPath = await AsyncStorage.getItem('@MainPath');
            const altPath = await AsyncStorage.getItem('@AltPath');
            mainPath != null ? setMainPath(JSON.parse(mainPath)) : null;
            altPath != null ? setAltPath(JSON.parse(altPath)) : null;
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
    }
    
    const insert = (arr, index, newItem) => [
        // part of the array before the specified index
        ...arr.slice(0, index),
        // inserted item
        newItem,
        // part of the array after the specified index
        ...arr.slice(index)
    ]

    const handleSelect = (item, index) => {
        console.log(index, item);
    };

    const handleAdd = (index) => {
        activePath ?
            setMainPath(insert(mainPath, index, {}))
            : 
            setAltPath(insert(altPath, index, {}))
        console.log("Added:", index)
    };

    const handleRemove = (index) => {
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
        console.log("Removed:", index);
    };

    useEffect(() => {
        const fetchPaths = async () => {
            await getData();
        }

        fetchPaths();
    }, []);

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
                                !activePath ? styles.pathActive : null
                            ]}
                            onPress={() => setActivePath(!activePath)}
                        >
                            <Text style={[styles.pathButtonText, !activePath ? styles.pathActiveText : null]}>Alternate Path</Text>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.pathButton,
                                {borderTopRightRadius: 3, borderBottomRightRadius: 3, borderLeftWidth: 0},
                                activePath ? styles.pathActive : null
                            ]}
                            onPress={() => setActivePath(!activePath)}
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
                                    value={speed}
                                    onChangeText={() => setSpeed(speed)}
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
                                    value={alti}
                                    onChangeText={() => setAlti(alti)}
                                    keyboardType={'number-pad'}
                                    returnKeyType={ 'done' }
                                />
                            </View>
                        </View>
                    </View>

                    {/* Path Inputs */}
                    <View style={styles.inputsContainer}>
                    {
                        activePath ?
                             mainPath.map((item, index) => {
                                if (index != 0) {
                                    return(
                                        <PlanningInput
                                            key={index}
                                            item={item}
                                            index={index}
                                            start={index == 1}
                                            dest={index == mainPath.length - 1}
                                            select={handleSelect}
                                            add={handleAdd}
                                            remove={handleRemove}
                                        />
                                    )
                                }
                            })
                            : 
                            altPath.map((item, index) => {
                                if (index != 0) {
                                    return(
                                        <PlanningInput
                                            key={index}
                                            item={item}
                                            index={index}
                                            start={index == 1}
                                            dest={index == altPath.length - 1}
                                            select={handleSelect}
                                            add={handleAdd}
                                            remove={handleRemove}
                                        />
                                    )
                                }
                            })
                    }
                    </View>
                </View>

                {/* Bottom Action Buttons */}
                <View style={styles.bottom}>
                    <Pressable
                        style={styles.button}
                        // onPress={selectAlternate}
                    >
                        <Text style={styles.buttonText}>More</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, {borderColor: Colors.blue}]}
                        // onPress={selectAlternate}
                    >
                        <Text style={styles.buttonText}>Evaluate</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, {borderColor: Colors.blue, backgroundColor: Colors.blue}]}
                        // onPress={selectAlternate}
                    >
                        <Text style={[styles.buttonText, {color: Colors.background}]}>View</Text>
                    </Pressable>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}