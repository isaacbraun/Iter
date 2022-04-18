/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    View,
    Pressable,
    Keyboard,
    Alert,
    TouchableWithoutFeedback,
} from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons'; 
import { Slider } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useInterval } from 'usehooks-ts';
import { useFocusEffect } from '@react-navigation/native';

import { Colors } from '../tools/Values';
import { hoursDisplay } from '../tools/Tools';
import { goToOrigin, markerFilters, getRouteArray } from '../tools/HomeScreenFunctions';
import { Search } from '../components';
import { HomeScreenStyles as styles } from '../styles';

// Reduce Size / Hide Metars

export default function HomeScreen({ route, navigation }) {
    // Timeline Variables and Functions
    const date = new Date();
    const hours = date.getHours();  
    const timelineMin = hours;
    const timelineMax = hours + 24;
    const [timelineValue, setTimelineValue] = useState(hours);
    const [timelineState, setTimelineState] = useState(false);

    // Timeline Play/Pause Function
    useInterval(() => {
        let newVal = timelineValue + 1;
        if (newVal <= timelineMax) {
            setTimelineValue(newVal);
        } else {
            setTimelineState(false);
        }
    }, timelineState ? 800 : null);

    // Map Variables and Functions
    const mapRef = useRef(null);

    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [region, setRegion] = useState({
        latitude: 47.116,
        longitude: -101.299,
        latitudeDelta: 30,
        longitudeDelta: 10,
    });

    const [metarType, setMetarType] = useState(true);
    const [metars, setMetars] = useState(null);
    const [mainPath, setMainPath] = useState(null);
    const [altPath, setAltPath] = useState(null);
    const [displayMainPath, setDisplayMainPath] = useState(false);
    const [displayAltPath, setDisplayAltPath] = useState(false);

    // Get Metar and Taf data from Storage
    const getData = async () => {
        try {
            const metars = await AsyncStorage.getItem('@Merged');
            metars != null ? setMetars(JSON.parse(metars)) : null;
        } catch(e) {
            console.log("HomeScreen Read Error: ", e);
        }
    };

    // Get Flight Paths from Storage
    const getPaths = async () => {
        try {
            const mainPath = await AsyncStorage.getItem('@MainPath');
            const altPath = await AsyncStorage.getItem('@AltPath');
            mainPath !== null ? setMainPath(JSON.parse(mainPath)) : null;
            altPath !== null ? setAltPath(JSON.parse(altPath)) : null;
        } catch(e) {
            console.log("HomeScreen Path Read Error: ", e);
        }
    }

    // Request User Location Access and Animate Map to Location
    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Location Access Needed for Best Functionality');
            return;
        }

        setLoading(true);
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setLoading(false);

        mapRef.current.animateToRegion(
            {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 1,
                longitudeDelta: 0.5,
            },
            2000
        );
        setRegion(location);
    };

    // Get User Location & Get All Metars
	useEffect(() => {
        getData();
        getLocation();
	}, []);

    // Get Paths on Navigation to Home
    useFocusEffect(
        React.useCallback(() => {
            if (route.params && route.params.view === true) {
                const awaitPaths = async () => {
                    await getPaths();

                    setDisplayMainPath(true);
                    if (route.params.paths == 2) {
                        setDisplayAltPath(true);
                    }

                }
                awaitPaths();
            }
        }, [route.params])
    );

    // Function Run When "View" Clicked in FlightPlanScreen
    const userInput = useRef(false);
    useEffect(() => {
        if (userInput.current) {
            const startLat = parseFloat(mainPath[1].latitude[0]);
            const startLng = parseFloat(mainPath[1].longitude[0])
            const destLat = parseFloat(mainPath[mainPath.length - 1].latitude[0]);
            const destLng = parseFloat(mainPath[mainPath.length - 1].longitude[0])
            mapRef.current.animateToRegion(
                {
                    latitude: (startLat + destLat) / 2,
                    longitude: (startLng + destLng) / 2,
                    latitudeDelta: (startLat - destLat) + 2,
                    longitudeDelta: (startLng - destLng) + 2,
                },
                2000
            );
        } else {
            userInput.current = true;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mainPath]);
    

    return(
        <View style={styles.main}>
            {/* Map View */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    initialRegion={{
                        latitude: 47.116,
                        longitude: -101.299,
                        latitudeDelta: 30,
                        longitudeDelta: 10,
                    }}
                    onRegionChangeComplete={(region) => setRegion(region)}
                    mapPadding={{ left: 6, right: 6, top: 0, bottom: 40 }}
                    maxZoomLevel={10}
                    rotateEnabled={false}
                >
                    {/* METAR Station Models */}
                    {metars ?
                        metars.map((elem, index) => {
                            const marker = markerFilters(elem, index, region, hours < timelineValue ? timelineValue : null, navigation, metarType);
                            return marker ? marker : null;
                        })
                        : null
                    }
                    {/* Main Path */}
                    {displayMainPath ?
                        <Polyline
                            coordinates={getRouteArray(mainPath)}
                            strokeColor={Colors.blue}
                            strokeWidth={5}
                        /> : null
                    }
                    {/* Alternate Path */}
                    {displayAltPath ?
                        <Polyline
                            coordinates={getRouteArray(altPath)}
                            strokeColor={Colors.green}
                            strokeWidth={5}
                        /> : null
                    }
                </MapView>
            </TouchableWithoutFeedback>

            {/* Search Bar + Menu Button */}
            <View style={styles.searchContainer}>
                <Search
                    function={(item) => {
                        mapRef.current.animateToRegion(
                            {
                                latitude: item.latitude[0],
                                longitude: item.longitude[0],
                                latitudeDelta: 1.5,
                                longitudeDelta: .75,
                            },
                            2500
                        );
                    }}
                    placeholder={true}
                    style={{marginRight: 15}}
                />
                <Pressable
                    style={styles.button}
                    onPress={() => navigation.navigate('Settings')}
                >
                    <Feather name="menu" size={24} color={ Colors.text } />
                </Pressable>
            </View>

            {/* Location Loading Indicator */}
            { loading ?
                <View style={styles.loading}>
                    <View style={styles.loadingInner}>
                        <Text style={{color: Colors.text}}>Getting Your Location...</Text>
                    </View>
                </View> : null
            }

            {/* Sidebar Buttons */}
            <View style={styles.buttonsContainer}>
                <Pressable
                    style={[styles.button, {marginBottom: 15}]}
                    onPress={() => goToOrigin(mapRef, location)} // ORIGIN
                >
                    <Feather name="navigation" size={24} color={ Colors.blue } />
                </Pressable>
                <Pressable
                    style={[styles.button, {marginBottom: 15}]}
                    onPress={() => setMetarType(!metarType)} // ORIGIN
                >
                    {metarType ?
                        <Feather name="circle" size={24} color={ Colors.blue } />
                        :
                        <Feather name="square" size={24} color={ Colors.blue } />
                    }
                </Pressable>
                {displayMainPath ?
                    <Pressable
                        style={[styles.button, {marginBottom: 15, backgroundColor: Colors.red}]}
                        onPress={() => {
                            setDisplayMainPath(false);
                            setDisplayAltPath(false);
                            navigation.setParams({ view: false, paths: null })
                        }}
                    >
                        {/* <Feather name="x" size={24} color={ Colors.background } /> */}
                        <MaterialIcons name="not-interested" size={24} color={ Colors.background } />
                    </Pressable> : null
                }
                <Pressable
                    style={[styles.button, {backgroundColor: Colors.blue}]}
                    onPress={() => navigation.navigate('FlightPlan')} // Add Path / Re-Evaluate
                >
                    <Feather name="plus" size={28} color={ Colors.background } />
                </Pressable>
            </View>
            {/* Timeline Bar */}
            <View style={styles.timelineContainer}>
                <Pressable
                    style={[styles.button, styles.play]}
                    onPress={ () => setTimelineState(!timelineState)}
                >
                    { !timelineState ?
                        <FontAwesome name="play" size={24} color={ Colors.blue } />
                        :
                        <FontAwesome name="pause" size={24} color={ Colors.blue } />
                    }
                </Pressable>
                <View style={styles.timeline}>
                    <Slider 
                        value={timelineValue}
                        onValueChange={setTimelineValue}
                        maximumValue={timelineMax}
                        minimumValue={timelineMin}
                        step={1}
                        allowTouchTrack
                        trackStyle={{ height: 3}}
                        thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
                        thumbProps={{
                            children: (
                            <FontAwesome
                                name="circle"
                                size={20}
                                color={Colors.blue}
                            />
                            ),
                        }}
                    />
                </View>
                <View style={styles.timeContainer}>
                    <Text style={styles.time}>{hoursDisplay(date, timelineValue)}</Text>
                </View>
            </View>
        </View>
    );
}