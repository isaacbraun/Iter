import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    View,
    Pressable,
    TextInput,
    Keyboard,
    Alert,
    TouchableWithoutFeedback,
    Dimensions,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { Feather, FontAwesome } from '@expo/vector-icons'; 
import { Slider } from 'react-native-elements';

import { Colors, getLatLng, level_1_airports, level_2_airports, level_3_airports } from '../components/Tools';
import StationModel from '../components/StationModel';
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
    const [loading, setLoading] = useState(false);
    const [region, setRegion] = useState({
        latitude: 47.116,
        longitude: -101.299,
        latitudeDelta: 30,
        longitudeDelta: 10,
    });

    const [location, setLocation] = useState(null);

    const airports = require('airport-codes').toJSON();
    // console.log(airports.findWhere({ icao: "KCLE" }).get('name'));
    // console.log(airports);
    // for (let value of airports) {
    //     if (value.name.substring(value.name.length - 4) == "Intl") {
    //         console.log(value);
    //     }
    // }
    const [metars, setMetars] = useState(null);
    const [viewMarkers, setViewMarkers] = useState(null);
    const converter = require('react-native-xml2js');

    const getAllMetars = () => {
        let fetchString = "https://www.aviationweather.gov/adds/dataserver_current/current/metars.cache.xml";
        // let fetchString = "https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&stationString=~us&hoursBeforeNow=1&mostRecent=true"

        return fetch(fetchString)
        .then(response => response.text())
        .then(text => converter.parseString(text, function (err, result) {
            setMetars(result.response.data[0].METAR);
        }))
        .catch((error) => {
            console.error(error);
        })
    };

    const getViewMetars = (region) => {
        let tempArray = [];
        if (metars) {
            for (const item of metars) {
                if (item.hasOwnProperty('longitude') && item.hasOwnProperty('latitude')) {
                    if (
                        (item.latitude[0] <= region.latitude + region.latitudeDelta) && (item.latitude[0] >= region.latitude - region.latitudeDelta)
                        && (item.longitude[0] <= region.longitude + region.longitudeDelta) && (item.longitude[0] >= region.longitude - region.longitudeDelta)
                    ) {
                        if (region.longitudeDelta >= 50 && region.latitudeDelta >= 70) {
                            if (level_1_airports.hasOwnProperty(item.station_id[0])) {
                                tempArray.push(item);
                            }
                        }
                        else if (region.longitudeDelta >= 20 && region.latitudeDelta >= 30) {
                            if (level_2_airports.hasOwnProperty(item.station_id[0])) {
                                tempArray.push(item);
                            }
                        }
                        else if (region.longitudeDelta >= 10 && region.latitudeDelta >= 15) {
                            if (level_3_airports.hasOwnProperty(item.station_id[0])) {
                                tempArray.push(item);
                            }
                        }
                        else {
                            tempArray.push(item);
                        }
                    }
                }
            }
            setViewMarkers(tempArray);
        }
    }

    const onRegionChange = (region) => {
        setRegion(region);
        getViewMetars(region);
        // console.log(region);
    };

    // Get User Location
	useEffect(() => {
        getAllMetars();
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Location Access Needed for Best Functionality');
                return;
            }

            setLoading(true);
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            mapRef.current.animateToRegion(
                {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 1,
                    longitudeDelta: 0.5,
                },
                2000
            );
            setLoading(false);
		})();
	}, []);

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
                    onRegionChangeComplete={(region) => onRegionChange(region)}
                    mapPadding={{ left: 6, right: 6, top: 0, bottom: 40 }}
                    // maxZoomLevel={10}
                    rotateEnabled={false}
                >
                {viewMarkers ?
                    viewMarkers.map((marker, index) => {
                        // let airportInfo = null;
                        // airportInfo = airports.findWhere({ icao: marker.station_id[0] });
                        // // && airportInfo.get('dst') == "A"
                        // if (airportInfo) {
                        // let name = airportInfo.get('name');
                        return (
                            <Marker
                                key={index}
                                coordinate={getLatLng(Number(marker.latitude[0]), Number(marker.longitude[0]))}
                                // title={marker.station_id[0] + ": " + name}
                                tracksViewChanges={false}
                            >
                                <StationModel
                                    {...marker}

                                />
                                <Callout>
                                    <View style={styles.callout}>
                                        <Text style={{marginBottom: 10}}>{marker.station_id[0]}</Text>
                                        <Text>{marker.raw_text[0]}</Text>
                                    </View>
                                </Callout>
                            </Marker>
                        )
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