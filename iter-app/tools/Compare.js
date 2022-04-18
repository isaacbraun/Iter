// import React from 'react';
import { Alert } from 'react-native';

export function pathsMatch(main, alt) {
    return (main[1] == alt[1]) && (main[main.length - 1] == alt[alt.length - 1]); 
}

export function compare(main, alt) {
    Alert.alert("Compare Success");
    
}