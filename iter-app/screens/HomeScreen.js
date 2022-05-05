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

import { LightColors, DarkColors } from '../tools/Values';
import { hoursDisplay, getRegionFromPaths } from '../tools/Tools';
import { pathsExact } from '../tools/Compare';
import { goToOrigin, markerFilters, getRouteArray } from '../tools/HomeScreenFunctions';
import { Search } from '../components';
import { HomeScreenStyles, HomeScreenStylesDark, darkMapStyles } from '../styles';

export default function HomeScreen({ route, navigation }) {
    const [theme, setTheme] = useState(false);
    const Colors = theme ? DarkColors : LightColors;
    const styles = theme ? HomeScreenStylesDark : HomeScreenStyles;

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
    const [renderPaths, setRenderPaths] = useState(false);

    // Get Theme from Storage
    const getTheme = async () => {
        try {
            const theme = await AsyncStorage.getItem('@Theme');
            theme != null ? setTheme(theme === 'true') : null;
        } catch(e) {
            console.log("HomeScreen Theme Read Error: ", e);
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

    // Clear Paths From View
    const clearPaths = () => {
        navigation.setParams({ view: false, paths: null });
        setDisplayMainPath(false);
        setDisplayAltPath(false);
    };

    // Get User Location & Get All Metars
	useEffect(() => {
        getTheme();
        getMetarType();
        getData();
        getLocation();
	}, []);

    // Get Paths on Navigation to Home
    useFocusEffect(
        React.useCallback(() => {
            getTheme();
            setDisplayMainPath(false);
            setDisplayAltPath(false);

            if (route.params && route.params.view === true) {
                const awaitPaths = async () => {
                    await getPaths();

                    if (route.params.paths == 1 || route.params.paths == 3) {
                        setDisplayMainPath(true);
                    }
                    if (route.params.paths == 2 || route.params.paths == 3) {
                        setDisplayAltPath(true);
                    }
                    setRenderPaths(!renderPaths);
                }
                awaitPaths();
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [route.params])
    );

    // Function Run When "View" Clicked in FlightPlanScreen
    const modified = useRef(false);
    useEffect(() => {
        if (modified.current) {
            if (displayMainPath || displayAltPath) {
                const pathRegion = getRegionFromPaths(mainPath, altPath);
                mapRef.current.animateToRegion(
                    pathRegion,
                    2000
                );
            }            
        } else {
            modified.current = true;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [renderPaths]);
    

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
                    minDelta={0.01}
                    rotateEnabled={false}
                    userInterfaceStyle={theme ? 'dark' : 'light'}
                    customMapStyle={theme ? darkMapStyles : []}
                >
                    {/* METAR Station Models */}
                    {metars ?
                        metars.map((elem, index) => {
                            const marker = markerFilters(elem, index, region, hours < timelineValue ? timelineValue : null, navigation, metarType, theme);
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
                            strokeWidth={4}
                            lineDashPattern={pathsExact(mainPath, altPath) ? [2, 7] : null}
                        /> : null
                    }
                </MapView>
            </TouchableWithoutFeedback>

            {/* Search Bar + Menu Button */}
            <View style={styles.searchContainer}>
                <Search
                    airports={metars}
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
                    theme={theme}
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
                        onPress={() => clearPaths()}
                    >
                        <MaterialIcons name="not-interested" size={24} color={ Colors.background } />
                    </Pressable> : null
                }
                <Pressable
                    style={[styles.button, {backgroundColor: Colors.blue}]}
                    onPress={() => navigation.navigate('FlightPlan', { theme: theme })} // Add Path / Re-Evaluate
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