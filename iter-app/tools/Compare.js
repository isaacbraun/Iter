// import React from 'react';
import { Alert } from 'react-native';

export function pathsMatch(main, alt, alert) {
    if (main[0].speed == '') {
        if (alert) Alert.alert("Main Path Cruise Speed Required");
        return false;
    }
    else if (main[0].alti == '') {
        if (alert) Alert.alert("Main Path Altitude Required");
        return false;
    }
    else if (alt[0].speed == '') {
        if (alert) Alert.alert("Alternate Path Cruise Speed Required");
        return false;
    }
    else if (alt[0].alti == '') {
        if (alert) Alert.alert("Alternate Path Altitude Required");
        return false;
    }
    else if (main == null) {
        if (alert) Alert.alert("No Main Path Provided");
        return false;
    }
    else if (alt == null) {
        if (alert) Alert.alert("No Alternate Path Provided");
        return false;
    }
    else if (main.includes(null)) {
        if (alert) Alert.alert("Main Path Cannot Include Empty Points");
        return false;
    }
    else if (alt.includes(null)) {
        if (alert) Alert.alert("Alternate Path Cannot Include Empty Points");
        return false;
    }
    else {
        const match = (main[1].station_id[0] === alt[1].station_id[0]) && (main[main.length - 1].station_id[0] === alt[alt.length - 1].station_id[0]); 
        if (!match) {
            if (alert) Alert.alert("Path Origins and Destinations Must Be The Same");
            return false;
        } else {
            return true;
        }
    }
}

export function pathsExact(main, alt) {
    for (let i = 1; i < main.length; i++) {
        if (main[i].station_id[0] != alt[i].station_id[0]) {
            return false;
        }
    }
    return true;
}

// Calculate Distance Between Two Points on Earth
// https://www.geeksforgeeks.org/program-distance-two-points-earth/
export function distance(lat1, lat2, lon1, lon2) {
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 =  lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
                + Math.cos(lat1) * Math.cos(lat2)
                * Math.pow(Math.sin(dlon / 2),2);
            
    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    // calculate the result and convert to miles
    return((c * r) * 0.6213711922);
}

export function compare(main, alt) {
    Alert.alert("Compare Success");
    
}