import React from 'react';
import { level_1_airports, level_2_airports, level_3_airports, level_4_airports } from "../components/Values";
import Marker from '../components/Marker';

// Checks if Marker is Within View Region
function isWithinRegion(marker, region, offset) {
    if ((marker.latitude[0] <= region.latitude + offset) && (marker.latitude[0] >= region.latitude - offset)
    && (marker.longitude[0] <= region.longitude + offset) && (marker.longitude[0] >= region.longitude - offset)) {
        return true;
    } else {
        return false;
    }
}

// Control Filtering of Markers Displayed on Map
export function markerFilters(marker, index, region, hour, navigation) {
    if (Object.prototype.hasOwnProperty.call(marker, 'longitude') && Object.prototype.hasOwnProperty.call(marker, 'latitude')) {
        if (region.longitudeDelta >= 70) {
            if (level_1_airports.includes(marker.station_id[0])) {
                return <Marker key={index} index={index} marker={marker} hour={hour} navigation={navigation} />
            }
        }
        else if (region.longitudeDelta >= 30) {
            if (level_2_airports.includes(marker.station_id[0])) {
                return <Marker key={index} index={index} marker={marker} hour={hour} navigation={navigation} />
            }
        }
        else if (region.longitudeDelta >= 20) {
            if (level_3_airports.includes(marker.station_id[0])) {
                return <Marker key={index} index={index} marker={marker} hour={hour} navigation={navigation} />
            }
        }
        else if (region.longitudeDelta >= 10) {
            if (level_4_airports.includes(marker.station_id[0])) {
                return <Marker key={index} index={index} marker={marker} hour={hour} navigation={navigation} />
            }
        }
        else {
            if (region.longitudeDelta >= 7) {
                if (isWithinRegion(marker, region, 12)) {
                    if (marker.type == "large_airport") {
                        return <Marker key={index} index={index} marker={marker} hour={hour} navigation={navigation} />
                    }
                }
            }
            if (region.longitudeDelta >= 4) {
                if (isWithinRegion(marker, region, 4)) {
                    if (marker.type == "large_airport") {
                        return <Marker key={index} index={index} marker={marker} hour={hour} navigation={navigation} />
                    }
                }
            }
            else if (region.longitudeDelta >= 1.5) {
                if (isWithinRegion(marker, region, 2)) {
                    if (marker.type == "medium_airport" || marker.type == "large_airport") {
                        return <Marker key={index} index={index} marker={marker} hour={hour} navigation={navigation} />
                    }
                }
            }
            else {
                if (isWithinRegion(marker, region, 1)) {
                    return <Marker key={index} index={index} marker={marker} hour={hour} navigation={navigation} />
                }
            }
        }
    } else {
        return null;
    }
}

// Animate Map to User Location or Centerpoint if Not Granted
export function goToOrigin(mapRef, location) {
    mapRef.current.animateToRegion(
        {
            latitude: location ? location.coords.latitude : 47.116,
            longitude: location ? location.coords.longitude : -101.299,
            latitudeDelta: 1,
            longitudeDelta: 0.5,
        },
        1000
    );
}

// Return Array of Coordinates for Path
export function getRouteArray(array) {
    let result = [];
    for (const i in array) {
        if (i != 0) {
            result.push({
                latitude: array[i] ? array[i].latitude[0] : null,
                longitude: array[i] ? array[i].longitude[0] : null
            })
        }
    }
    return result;
}