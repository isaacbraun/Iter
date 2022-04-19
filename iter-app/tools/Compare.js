// import React from 'react';
import { Alert } from 'react-native';

export function pathsMatch(main, alt) {
    if (main == null) return false;
    if (alt == null) return false;

    if (main.includes(null)) return false;
    if (alt.length == 3) {
        if ((alt[1] != null && alt[2] == null) || (alt[1] == null && alt[2] != null)) {
            return false;
        }
        else if (alt[1] == null && alt[2] == null) {
            return false;
        }
    }
    else if (alt.length != 3) {
        if (alt.includes(null)) return false;
    }

    return (main[1].station_id[0] === alt[1].station_id[0]) && (main[main.length - 1].station_id[0] === alt[alt.length - 1].station_id[0]); 
}

export function pathsExact(main, alt) {
    for (let i = 1; i < main.length; i++) {
        if (main[i].station_id[0] != alt[i].station_id[0]) {
            return false;
        }
    }
    return true;
}

export function compare(main, alt) {
    Alert.alert("Compare Success");
    
}