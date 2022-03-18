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

import { Colors } from '../components/Values';
import { getAllMetars } from '../components/Tools';
import { level_1_airports, level_2_airports, level_3_airports, level_4_airports } from "../components/Values";
import Marker from '../components/Marker';
import { HomeScreenStyles as styles } from '../styles';

export default function HomeScreen({ navigation }) {
    // let timer;

    // const playTimeline = () => {
    //     if (!timer) {
    //         setTimelineState(true);
    //         let newVal = timelineValue;
    //         if (newVal < timelineMax) {
    //             newVal++;
    //             setTimelineValue(newVal);
    //         }
    //         timer = setInterval(() => {
    //             if (newVal < timelineMax) {
    //                 newVal++;
    //                 setTimelineValue(newVal);
    //             } else {
    //                 stopTimeline();
    //             }
    //         }, 1000);
    //     }
    // };
    
    // const stopTimeline = () => {
    //     clearInterval(timer);
    //     timer = null;
    //     setTimelineState(false);
    // };

    const [searchValue, setSearchValue] = useState(null);
    const [timelineMin, setTimelineMin] = useState(0);
    const [timelineMax, setTimelineMax] = useState(10);
    const [timelineValue, setTimelineValue] = useState(0);
    const [timelineState, setTimelineState] = useState(false);

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

    const converter = require('react-native-xml2js');

    // Animate Map to User Location or Centerpoint if Not Granted
    const goToOrigin = () => {
        mapRef.current.animateToRegion(
            {
                latitude: location ? location.coords.latitude : 47.116,
                longitude: location ? location.coords.longitude : -101.299,
                latitudeDelta: 1,
                longitudeDelta: 0.5,
            },
            1000
        );
    };

    // Get User Location & Get All Metars
	useEffect(() => {
        getAllMetars().then(text => converter.parseString(text, function (err, result) {
            setMetars(result.response.data[0].METAR);
        }));
        
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Location Access Needed for Best Functionality');
                return;
            }

            setLoading(true);
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            goToOrigin();
            setLoading(false);
		})();
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
                    metars.map((marker, index) => {
                        if (marker.hasOwnProperty('longitude') && marker.hasOwnProperty('latitude')) {
                            if (region.longitudeDelta >= 50 && region.latitudeDelta >= 100) {
                                console.log("Level 1");
                                if (level_1_airports.hasOwnProperty(marker.station_id[0])) {
                                    return <Marker key={index} index={index} marker={marker} />
                                }
                            }
                            else if (
                                (marker.latitude[0] <= region.latitude + region.latitudeDelta) && (marker.latitude[0] >= region.latitude - region.latitudeDelta)
                                && (marker.longitude[0] <= region.longitude + region.longitudeDelta) && (marker.longitude[0] >= region.longitude - region.longitudeDelta)
                            ) {
                                if (region.longitudeDelta >= 50 && region.latitudeDelta >= 70) {
                                    console.log("Level 2");
                                    if (level_2_airports.hasOwnProperty(marker.station_id[0])) {
                                        return <Marker key={index} index={index} marker={marker} />
                                    }
                                }
                                else if (region.longitudeDelta >= 20 && region.latitudeDelta >= 30) {
                                    console.log("Level 3");
                                    if (level_3_airports.hasOwnProperty(marker.station_id[0])) {
                                        return <Marker key={index} index={index} marker={marker} />
                                    }
                                }
                                else if (region.longitudeDelta >= 10 && region.latitudeDelta >= 15) {
                                    console.log("Level 4");
                                    if (level_4_airports.hasOwnProperty(marker.station_id[0])) {
                                        return <Marker key={index} index={index} marker={marker} />
                                    }
                                }
                                else {
                                    return <Marker key={index} index={index} marker={marker} />
                                }
                            }
                        }
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
                    onPress={goToOrigin} // ORIGIN
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
                    // onPress={!timelineState ? playTimeline : stopTimeline}
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
                    <Text style={styles.time}>{timelineValue}</Text>
                </View>
            </View>
        </View>
    );
}