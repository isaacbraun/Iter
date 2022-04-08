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
    const [airports, setAirports] = useState([]);
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
            const airportData = await AsyncStorage.getItem('@Search');
            airportData != null ? setAirports(JSON.parse(airportData)) : null;
        } catch(e) {
            console.log("Search Read Error: ", e);
        }
    };

    const matches = (item, query) => {
        // Making a case insensitive regular expression
        const regex = new RegExp(`${query.trim()}`, 'i');

        return (
            item.iata.search(regex) >= 0 ||
            item.icao.search(regex) >= 0 ||
            item.name.search(regex) >= 0
        );
    };

    const findFilm = (query) => {
        // Method called every time when we change the value of the input
        if (query) {
            // Setting the filtered film array according the query
            setFilteredAirports(
                airports.filter((film) => matches(film, query))
            );
        } else {
            // If the query is null then return blank
            setFilteredAirports([]);
        }
    };

    useEffect(() => {
        const fetchAirports = async () => {
            await getData();
            
            // setQueriedAirports();
        }

        // fetchAirports();
        setAirports([
            {
                "icao" : "00AA",
                "name" : "Aero B Ranch Airport",
                "iata" : "0AA"
            },
            {
                "icao" : "00AK",
                "name" : "Lowell Field",
                "iata" : "0AK"
            },
            {
                "icao" : "00AL",
                "name" : "Epps Airpark",
                "iata" : "0AL"
            },
            {
                "icao" : "00AS",
                "name" : "Fulton Airport",
                "iata" : "0AS"
            },
            {
                "icao" : "00AZ",
                "name" : "Cordes Airport",
                "iata" : "0AZ"
            }
        ])
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
                    selectedValue.name
                }
                // Onchange of the text changing the state of the query
                // Which will trigger the findFilm method
                // To show the suggestions
                onChangeText={(text) => findFilm(text)}
                placeholder={placeholder}
                flatListProps={{
                    keyExtractor: (_, idx) => idx,
                    renderItem: ({ item }) => (
                        <TouchableOpacity key={item.icao} onPress={() => setSelectedValue(item)}>
                            <Text style={styles.itemText}>{item.icao}: {item.name}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

