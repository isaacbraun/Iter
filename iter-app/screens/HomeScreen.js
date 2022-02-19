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
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Feather, FontAwesome } from '@expo/vector-icons'; 
import { Slider } from 'react-native-elements';

import { Colors, getLatLng } from '../components/Tools';
import { HomeScreenStyles as styles } from '../styles';

export default function HomeScreen({ navigation }) {
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
        latitudeDelta: 50,
        longitudeDelta: 10,
    });
    const [location, setLocation] = useState(null);

    const airports = require('airport-codes').toJSON();
    const [metars, setMetars] = useState(null);
    const converter = require('react-native-xml2js');

    const getAllMetars = () => {
        return fetch('https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&hoursBeforeNow=1')
        .then(response => response.text())
        .then(text => converter.parseString(text, function (err, result) {
            var reduced = [];
            for (const item in result.response.data[0].METAR) {
                let value = result.response.data[0].METAR[item];
                if (value.hasOwnProperty('longitude') && value.hasOwnProperty('latitude')) {
                    value.longitude = value.longitude[0];
                    value.latitude = value.latitude[0];
                    reduced.push(value);
                }
            }
            setMetars(reduced);
        }))
        .catch((error) => {
            console.error(error);
        })
    };

    // Get User Location
	useEffect(() => {
        getAllMetars();
        console.log(metars);
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
                    latitudeDelta: 0.06,
                    longitudeDelta: 0.04,
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
                latitudeDelta: 0.06,
                longitudeDelta: 0.04,
            },
            1000
        );
    };

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

    return(
        <View style={styles.main}>
            {/* Search Bar + Menu Button */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.search}
                    placeholder="Search Airports"
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

            {/* Map View */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    initialRegion={{
                        latitude: 47.116,
                        longitude: -101.299,
                        latitudeDelta: 50,
                        longitudeDelta: 10,
                    }}
                    onRegionChangeComplete={(region) => setRegion(region)}
                    mapPadding={{ left: 6, right: 6, top: 0, bottom: 40 }}
                >
                {metars ?
                    metars.map((marker, index) => {
                        return (
                            <Marker
                                key={index}
                                coordinate={getLatLng(Number(marker.latitude), Number(marker.longitude))}
                                // title={marker.iata + ": " + marker.name}
                                title={marker.station_id[0]}
                                description={"Replace with Metar Info Maybe?"}
                            />
                        )
                    })
                    : null
                }
                </MapView>
            </TouchableWithoutFeedback>

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