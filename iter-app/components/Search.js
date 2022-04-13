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

export function matches(airport, query) {
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
    const [inputValue, setInputValue] = useState(props.value ? props.value : '');
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

            filtered.sort(function(in_a, in_b) {
                const types = {
                    "large_airport": 3,
                    "medium_airport": 2,
                    "small_airport": 1
                };
                const a = in_a.type;
                const b = in_b.type;

                if (a == null && b != null) return 1;
                if (a != null && b == null) return -1;
                if (a == null && b == null) return 0;

                if(types[a] < types[b]) return 1;
                if(types[a] > types[b]) return -1;

                return 0;
            });

            setFilteredAirports(filtered);
        } else {
            // If the query length is less than or equal to 1 then return blank
            setFilteredAirports([]);
        }
    };

    const selectItem = (item) => {
        setSearching(false);
        setFilteredAirports([]);
        setInputValue(`${item.station_id[0]}: ${item.name}`)
        Keyboard.dismiss();

        // setCursor({start: 0, end: 0})

        props.function(item);
    };

    useEffect(() => {
        const fetchAirports = async () => {
            await getData();
        }

        fetchAirports();
    }, []);

    return (
        <View style={[styles.container, props.style]}>
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
                    placeholder={props.placeholder ? placeholder : null}
                    // selection={cursor}
                />
                { inputValue ?
                    <Pressable style={styles.close} onPress={() => {setInputValue(''); setFilteredAirports([]);}}>
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
                    const amount = props.amount ? props.amount : 8;
                    if (index < amount) {
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