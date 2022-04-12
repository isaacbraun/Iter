import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/SearchStyles';
// import { Colors } from '../components/Values';

export default function Search(props) {
    // For Main Data
    const [airports, setAirports] = useState(null);
    // For Filtered Data
    const [filteredAirports, setFilteredAirports] = useState([]);
    // For Selected Data
    const [selectedValue, setSelectedValue] = useState({});
    
    const isLoading = airports == null;
    const placeholder = isLoading
        ? 'Loading data...'
        : 'Search Airports';
    
    const getData = async () => {
        try {
            const airportData = await AsyncStorage.getItem('@Merged');
            airportData != null ? setAirports(JSON.parse(airportData)) : null;
        } catch(e) {
            console.log("Search Read Error: ", e);
        }
    };

    const matches = (item, query) => {
        // Making a case insensitive regular expression
        const regex = new RegExp(`${query.trim()}`, 'i');

        return (
            item.station_id[0].search(regex) >= 0 ||
            item.iata != null || item.iata != "null" ? item.iata.search(regex) >= 0 : false ||
            item.name != null || item.name != "null"? item.name.search(regex) >= 0 : false
        );
    };

    const findFilm = (query) => {
        // Method called every time when we change the value of the input
        if (query && airports != null) {

            let filtered = [];
            for (let i = 0; i < airports.length; i++) {
                if (matches(airports[i], query)) {
                    filtered.push(airports[i]);
                }
            }
            setFilteredAirports(filtered);

        } else {
            // If the query is null then return blank
            setFilteredAirports([]);
        }
    };

    useEffect(() => {
        const fetchAirports = async () => {
            await getData();
        }

        fetchAirports();
    }, []);

    return (
        <View style={styles.container}>
            <Autocomplete
                editable={!isLoading}
                autoCapitalize="none"
                autoCorrect={false}
                containerStyle={styles.searchContainer}
                // Data to show in suggestion
                data={filteredAirports}
                // Default value if you want to set something in input
                defaultValue={
                    JSON.stringify(selectedValue) === '{}' ?
                    '' :
                    `${selectedValue.station_id[0]}: ${selectedValue.name}`
                }
                // Onchange of the text changing the state of the query
                // Which will trigger the findFilm method
                // To show the suggestions
                onChangeText={(text) => text.length > 1 ? findFilm(text) : setFilteredAirports([])}
                placeholder={placeholder}
                flatListProps={{
                    keyExtractor: (_, idx) => idx,
                    renderItem: ({ item }) => (
                        <TouchableOpacity key={item.station_id[0]} onPress={() => setSelectedValue(item)}>
                            <Text style={styles.itemText}>{item.station_id[0]}: {item.name}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

