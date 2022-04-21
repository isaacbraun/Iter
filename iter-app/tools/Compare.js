// import React from 'react';
import { Alert } from 'react-native';

// Check if Two Paths Have Same Origin/Destination
// Also Does Input Validation and Alerts Reason if alert==true
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

// Checks if Two Paths are Exactly the Same
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
export function distance(startLat, startLng, destLat, destLng) {
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    startLat = Math.toRadians(startLat);
    startLng = Math.toRadians(startLng);
    destLat = Math.toRadians(destLat);
    destLng = Math.toRadians(destLng);

    // Haversine formula
    let dlon = destLng - startLng;
    let dlat = destLat - startLat;
    let a = Math.pow(Math.sin(dlat / 2), 2)
                + Math.cos(startLat) * Math.cos(destLat)
                * Math.pow(Math.sin(dlon / 2),2);
            
    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth.
    // Use 3956 for miles
    // Use 6371 for Km
    let r = 3956;

    // calculate the result
    return(c * r);
}

// Return Estimated Travel Speed in Mph
export function speed(speed, altitude) {
    return speed * 1.15078;
}

// Return Estimated Travel Time in hours
export function time(distance, speed) {
    return distance / speed;
}

// https://stackoverflow.com/questions/46590154/calculate-bearing-between-2-points-with-javascript
export function bearing(startLat, startLng, destLat, destLng){
    startLat = Math.toRadians(startLat);
    startLng = Math.toRadians(startLng);
    destLat = Math.toRadians(destLat);
    destLng = Math.toRadians(destLng);
  
    const y = Math.sin(destLng - startLng) * Math.cos(destLat);
    const x = Math.cos(startLat) * Math.sin(destLat) -
          Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
    const brng = Math.toDegrees(Math.atan2(y, x));
    return (brng + 360) % 360;
}

export function calculatePointsAlongPath(startLat, startLng, destLat, destLng) {
    const radius = 3956;
    const bearing = bearing(startLat, startLng, destLat, destLng);
    const distance = distance(startLat, startLng, destLat, destLng);
    const interval = 20;
    let points = [];

    for (let i = 1; i <= distance % interval; i++) {
        const destDistance = interval * i;
        const lat = Math.asin(Math.sin(startLat) * Math.cos(destDistance / radius) +
                    Math.cos(startLat) * Math.sin(destDistance / radius) * Math.cos(bearing));
        const lng = startLng + Math.atan2(Math.sin(bearing) * Math.sin(destDistance / radius) * Math.cos(startLat),
                    Math.cos(destDistance / radius) - Math.sin(startLat) * Math.sin(lat));

        
        points.push([lat, lng]);
    }
    
    return points;
}

export function fetchPoints(pointString) {
    // https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&flightPath=15;KCLE;KCHA&hoursBeforeNow=3&mostRecentForEachStation=constraint
}

export function getPoints(path) {
    let points = [];
    for (let i = 1; i < path.length - 2; i++) {
        points.push(path[i])
        points.concat(calculatePointsAlongPath(
            path[i].lattitude[0],
            path[i].longitude[0],
            path[i + 1].latitude[0],
            path[i + 1].longitude[0]
        ))
    }
}

export function compare(main, alt) {
    Alert.alert("Compare Success");
    
}