import React, { useEffect, useState } from 'react';
import {
    View,
    TextInput,
} from 'react-native';
import { useAirportsAutocomplete } from '@kevinhle/use-airports-autocomplete';
import styles from '../styles/SearchStyles';
import { Colors } from '../components/Values';

export default function Search(props) {
    const {
        ready,
        init,
        value,
        setValue,
        suggestions: { data }
    } = useAirportsAutocomplete();
    const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  
    const handleInput = () => {
        // setValue(e.target.value);
        setSuggestionsVisible(!suggestionsVisible);
    }
  
    const handleSelect = (val) => {
      setValue(val, false);
    }
  
    useEffect(() => {
      init();
    })
  
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.search}
                placeholder="Search Airport or City"
                placeholderTextColor={Colors.text}
                value={value}
                onChangeText={ () => handleInput() }
            />
            { suggestionsVisible ?
                <View style={styles.suggestions}>
                    {data.map(({ name, IATA }) => (
                        <View key={IATA} value={`${IATA} ${name}`} />
                    ))}
                </View>
                : null
            }
        </View>

    //   <div className="App">
    //     <Combobox onSelect={handleSelect} className="border-gray-500 ">
    //       <ComboboxInput
    //         className="w-80 max-w-2xl border-gray-500 border-2 bg-gray-200 px-1 py-1"
    //         value={value}
    //         onChange={handleInput}
    //         disabled={!ready}
    //       />
    //       <ComboboxPopover>
    //         <ComboboxList className="cursor-pointer">
    //           {renderSuggestions()}
    //         </ComboboxList>
    //       </ComboboxPopover>
    //     </Combobox>
    //   </div>
    )
}

