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
    const [allAirports, setAllAirports] = useState(null);
    const [queriedAirports, setQueriedAirports] = useState(null);
    const [query, setQuery] = useState('');
    
    const isLoading = allAirports == null;
    const placeholder = isLoading
        ? 'Loading data...'
        : 'Enter Star Wars film title';
    
    const getData = async () => {
        try {
            const airportData = await AsyncStorage.getItem('@Search');
            airportData != null ? setAllAirports(JSON.parse(airportData)) : null;
        } catch(e) {
            console.log("Search Read Error: ", e);
        }
    };

    const matches = (item, query) => {
        const inputLength = query.length;

        return (
            item.iata.toLowerCase().slice(0, inputLength) === query ||
            item.icao.toLowerCase().slice(0, inputLength) === query ||
            item.name.toLowerCase().slice(0, inputLength) === query
        );
    };

    const queryAirports = (query, data) => {
        if (isLoading || query === '') {
            return [];
        }
    
        // const regex = new RegExp(`${query.trim()}`, 'i');
        return data.filter((airport) => matches(airport, query));
    }

    useEffect(() => {
        const fetchAirports = async () => {
            await getData();
            console.error("Outside: ", allAirports);
            
            // setQueriedAirports();
        }

        fetchAirports();
    }, []);

    return (
        <View style={styles.container}>
            <Autocomplete
                editable={!isLoading}
                autoCorrect={false}
                data={
                    queriedAirports?.length === 1 && matches(queriedAirports[0], query)
                        ? [] // Close suggestion list in case movie title matches query
                        : queriedAirports
                }
                value={query}
                onChangeText={handleChange()}
                placeholder={placeholder}
                flatListProps={{
                    keyboardShouldPersistTaps: 'always',
                    keyExtractor: (airport) => airport.icao,
                    renderItem: ({ item }) => (
                        <TouchableOpacity onPress={() => setQuery(item)}>
                            <Text style={styles.itemText}>{item.icao} {item.name}</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
        </View>
        // <View style={styles.container}>
        //     <TextInput
        //         style={styles.search}
        //         placeholder="Search Airport or City"
        //         placeholderTextColor={Colors.text}
        //         value={value}
            //     onChangeText={ () => handleInput() }
            // />
            // { suggestionsVisible ?
            //     <View style={styles.suggestions}>
            //         {data.map(({ name, IATA }) => (
            //             <View key={IATA} value={`${IATA} ${name}`} />
            //         ))}
            //     </View>
            //     : null
            // }
        // </View>
    )
}

