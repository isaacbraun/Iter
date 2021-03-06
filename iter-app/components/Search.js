import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    Keyboard
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { SearchStyles, SearchStylesDark } from '../styles';
import { LightColors, DarkColors } from '../tools/Values';

export function matches(airport, query) {
    let icao, iata, name, municipality;
    icao = iata = name = municipality = false;
    
    // Making a case insensitive regular expression
    const regex = new RegExp(`${query.trim()}`, 'i');

    if (airport.station_id[0].search(regex) >= 0) {
        icao = true;
    }
    if (airport.iata != null) {
        if (airport.iata.search(regex) >= 0) {
            iata = true;
        }
    }
    if (airport.name != null) {
        if (airport.name.search(regex) >= 0) {
            name = true;
        }
    }
    if (airport.municipality != null) {
        if (airport.municipality.search(regex) >= 0) {
            municipality = true;
        }
    }

    return (icao || iata || name || municipality);
}

export default function Search(props) {
    const airports = props.airports;
    const [filteredAirports, setFilteredAirports] = useState([]);
    const [inputValue, setInputValue] = useState(props.value ? props.value : '');
    let timeout = null;    

    const Colors = props.theme ? DarkColors : LightColors;
    const styles = props.theme ? SearchStylesDark : SearchStyles;

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
        setFilteredAirports([]);
        setInputValue(`${item.station_id[0]}: ${item.name}`)
        Keyboard.dismiss();
        props.function(item);
    };

    const handleClear = () => {
        setInputValue('');
        setFilteredAirports([]);
        props.clear ? props.clear() : null;
    }

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
                    editable={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text) => {
                        setInputValue(text);
                        clearTimeout(timeout);
                        timeout = setTimeout(() => {findAirport(text)}, 600); 
                    }}
                    placeholder={props.placeholder ? 'Search Airports' : null}
                    placeholderTextColor={Colors.text}
                />
                { inputValue ?
                    <Pressable style={styles.close} onPress={() => handleClear()}>
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
                                <Text style={styles.itemText}>
                                    {item.station_id[0]}: {item.name}
                                </Text>
                            </Pressable>
                        )
                    }
                })}
            </View>
        </View>
    )
}