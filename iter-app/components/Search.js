import React, { useEffect, useState } from 'react';
import {
    View,
    TextInput,
} from 'react-native';
// import { useAirportsAutocomplete } from '@kevinhle/use-airports-autocomplete';
import styles from '../styles/SearchStyles';
import { Colors } from '../components/Values';

export default function Search(props) {
    const [value, setValue] = useState(null);
    const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.search}
                placeholder="Search Airport or City"
                placeholderTextColor={Colors.text}
                value={value}
            //     onChangeText={ () => handleInput() }
            />
            {/* { suggestionsVisible ?
                <View style={styles.suggestions}>
                    {data.map(({ name, IATA }) => (
                        <View key={IATA} value={`${IATA} ${name}`} />
                    ))}
                </View>
                : null
            } */}
        </View>
    )
}

