import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    View,
    Pressable,
    TextInput,
    Keyboard,
    Alert,
    TouchableWithoutFeedback,
} from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { Feather, FontAwesome } from '@expo/vector-icons'; 
import { Slider } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useInterval } from 'usehooks-ts';

import { Colors } from '../components/Values';
import { hoursDisplay } from '../components/Tools';
import { goToOrigin, markerFilters } from '../components/HomeScreenFunctions';
import { HomeScreenStyles as styles } from '../styles';

export default function HomeScreen({ navigation }) {    
    const [searchValue, setSearchValue] = useState(null);

    // Timeline Variables and Functions
    const date = new Date();
    const hours = date.getHours();  
    const [timelineMin, setTimelineMin] = useState(hours);
    const [timelineMax, setTimelineMax] = useState(hours + 24);
    const [timelineValue, setTimelineValue] = useState(hours);
    const [timelineState, setTimelineState] = useState(false);

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

    const [metars, setMetars] = useState(null);

    // Get Metar and Taf data from Storage
    const getData = async () => {
        try {
            const metars = await AsyncStorage.getItem('@Merged')
            metars != null ? setMetars(JSON.parse(metars)) : null;
        } catch(e) {
            console.log("Read Error: ", e);
        }
    };

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
        console.log(metars);
        // getLocation();
	}, []);

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
                {metars ?
                    metars.map((elem, index) => {
                        const marker = markerFilters(elem, index, region, hours < timelineValue ? timelineValue : null, navigation);
                        return marker ? marker : null;
                    })
                    : null
                }
                </MapView>
            </TouchableWithoutFeedback>

            {/* Search Bar + Menu Button */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.search}
                    placeholder="Search Airport or City"
                    placeholderTextColor={Colors.text}
                    value={searchValue}
                    onChangeText={setSearchValue}
                />
                <Pressable
                    style={styles.button}
                    onPress={() => navigation.navigate('Settings')}
                >
                    <Feather name="menu" size={24} color={ Colors.text } />
                </Pressable>
            </View>

            { loading ?
                <View style={styles.loading}>
                    <View style={styles.loadingInner}>
                        <Text style={{color: Colors.text}}>Getting Your Location...</Text>
                    </View>
                </View> : null
            }

            {/* Bottom Timeline + Buttons */}
            <View style={styles.buttonsContainer}>
                <Pressable
                    style={[styles.button, {marginBottom: 15}]}
                    onPress={() => goToOrigin(mapRef, location)} // ORIGIN
                >
                    <Feather name="navigation" size={24} color={ Colors.blue } />
                </Pressable>
                <Pressable
                    style={[styles.button, {backgroundColor: Colors.blue}]}
                    onPress={() => navigation.navigate('FlightPlan')} // Add Path / Re-Evaluate
                >
                    <Feather name="plus" size={28} color={ Colors.background } />
                </Pressable>
            </View>
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