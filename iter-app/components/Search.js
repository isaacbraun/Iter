import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    Keyboard
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/SearchStyles';
import { Colors } from './Values';

function matches(airport, query) {
    let icao, iata, name, municipality;
    icao = iata = name = municipality = false;
    
    // Making a case insensitive regular expression
    const regex = new RegExp(`${query.trim()}`, 'i');

    if (airport.station_id[0].search(regex) >= 0) {
        icao = true;
    }
    else if (airport.iata != null) {
        if (airport.iata.search(regex) >= 0) {
            iata = true;
        }
    }
    if (airport.name != null) {
        if (airport.name.search(regex) >= 0) {
            name = true;
        }
    }
    else if (airport.municipality != null) {
        if (airport.municipality.search(regex) >= 0) {
            municipality = true;
        }
    }

    return (icao || iata || name || municipality);
}

export default function Search(props) {
    const [airports, setAirports] = useState(null);
    const [filteredAirports, setFilteredAirports] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [searching, setSearching] = useState(true);
    const isLoading = airports == null;
    const placeholder = isLoading ? 'Loading data...' : 'Search Airports';
    let timeout = null;    
    // const [cursor, setCursor] = useState({start: 0, end: 0});
    
    const getData = async () => {
        try {
            const airportData = await AsyncStorage.getItem('@Merged');
            airportData != null ? setAirports(JSON.parse(airportData)) : null;
        } catch(e) {
            console.log("Search Read Error: ", e);
        }
    };

    const findAirport = (query) => {
        // Method called every time when we change the value of the input
        if (query.length > 1) {
            let filtered = [];
            for (let i = 0; i < airports.length; i++) {
                if (matches(airports[i], query)) {
                    filtered.push(airports[i]);
                }
            }
            setFilteredAirports(filtered);
            
        } else {
            // If the query lenght is less than or equal to 1 then return blank
            setFilteredAirports([]);
        }
    };

    const selectItem = (item) => {
        setSearching(false);
        setFilteredAirports([]);
        setInputValue(`${item.station_id[0]}: ${item.name}`)
        Keyboard.dismiss();

        // setCursor({start: 0, end: 0})

        props.mapRef.current.animateToRegion(
            {
                latitude: item.latitude[0],
                longitude: item.longitude[0],
                latitudeDelta: 1.5,
                longitudeDelta: .75,
            },
            2500
        );
        
    };

    useEffect(() => {
        const fetchAirports = async () => {
            await getData();
        }

        fetchAirports();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <TextInput
                    style={[
                        styles.searchInner,
                        filteredAirports.length > 0 ?
                        {
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0
                        } : null
                    ]}
                    value={inputValue}
                    editable={!isLoading}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onFocus={() => {setSearching(true);}}
                    onChangeText={(text) => {
                        setInputValue(text);
                        clearTimeout(timeout);
                        timeout = setTimeout(() => {
                            searching ? findAirport(text) : null
                        }, 600); 
                    }}
                    placeholder={placeholder}
                    // selection={cursor}
                />
                { inputValue ?
                    <Pressable onPress={() => {setInputValue(''); setFilteredAirports([]);}}>
                        <EvilIcons name="close" size={22} color={Colors.text} />
                    </Pressable> : null
                }
            </View>
            <View
                style={[
                    styles.suggestions,
                    filteredAirports.length > 0 ? {borderTopWidth: 1} : null
                ]}
            >
                { filteredAirports.map((item, index) => {
                    if (index < 8) {
                        return (
                            <Pressable
                                key={index}
                                onPress={() => selectItem(item)}
                                style={styles.item}
                            >
                                <Text style={styles.itemText}>{item.station_id[0]}: {item.name}</Text>
                            </Pressable>
                        )
                    }
                })}
            </View>
        </View>
    )
}