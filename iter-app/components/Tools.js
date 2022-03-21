import React, { useState, useEffect, useRef } from 'react';
import { level_1_airports, level_2_airports, level_3_airports, level_4_airports } from "../components/Values";
import Marker from '../components/Marker';

export function getAllMetars() {
    let fetchString = "https://www.aviationweather.gov/adds/dataserver_current/current/metars.cache.xml";

    return fetch(fetchString)
    .then((response) => { return response.text() })
    .catch((error) => {
        console.error(error);
        return null;
    })
};

export function getAllTafs() {
    let fetchString = "https://www.aviationweather.gov/adds/dataserver_current/current/tafs.cache.xml";

    return fetch(fetchString)
    .then((response) => { return response.text() })
    .catch((error) => {
        console.error(error);
        return null;
    })
};

function isWithinRegion(marker, region, offset) {
    if ((marker.latitude[0] <= region.latitude + offset) && (marker.latitude[0] >= region.latitude - offset)
    && (marker.longitude[0] <= region.longitude + offset) && (marker.longitude[0] >= region.longitude - offset)) {
        return true;
    } else {
        return false;
    }
};

export function markerFilters(marker, index, region) {
    if (marker.hasOwnProperty('longitude') && marker.hasOwnProperty('latitude')) {
        if (region.longitudeDelta >= 70) {
            if (level_1_airports.includes(marker.station_id[0])) {
                return <Marker key={index} index={index} marker={marker} />
            }
        }
        else if (region.longitudeDelta >= 30) {
            if (level_2_airports.includes(marker.station_id[0])) {
                return <Marker key={index} index={index} marker={marker} />
            }
        }
        else if (region.longitudeDelta >= 20) {
            if (level_3_airports.includes(marker.station_id[0])) {
                return <Marker key={index} index={index} marker={marker} />
            }
        }
        else if (region.longitudeDelta >= 10) {
            if (level_4_airports.includes(marker.station_id[0])) {
                return <Marker key={index} index={index} marker={marker} />
            }
        }
        else {
            if (region.longitudeDelta >= 7) {
                if (isWithinRegion(marker, region, 12)) {
                    if (marker.type == "large_airport") {
                        return <Marker key={index} index={index} marker={marker} />
                    }
                }
            }
            if (region.longitudeDelta >= 4) {
                if (isWithinRegion(marker, region, 4)) {
                    if (marker.type == "large_airport") {
                        return <Marker key={index} index={index} marker={marker} />
                    }
                }
            }
            else if (region.longitudeDelta >= 1.5) {
                if (isWithinRegion(marker, region, 2)) {
                    if (marker.type == "medium_airport" || marker.type == "large_airport") {
                        return <Marker key={index} index={index} marker={marker} />
                    }
                }
            }
            else {
                if (isWithinRegion(marker, region, 1)) {
                    return <Marker key={index} index={index} marker={marker} />
                }
            }
        }
    } else {
        return null;
    }
};

export function hoursDisplay(date, timelineValue) {
    const dayAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    let month = dayAbbr[date.getMonth()];
    let day = date.getDate();
    let hours = timelineValue;

    if (hours >= 24) {
        day = day + 1;
        hours = hours - 24;
    }

    return `${month}. ${day} ${hours}:00`;
};