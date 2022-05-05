import { monthAbbr } from "./Values";

// Get Metars from AWC
export function getAllMetars() {
    return fetch("https://www.aviationweather.gov/adds/dataserver_current/current/metars.cache.xml")
    .then((response) => { return response.text() })
    .catch((error) => {
        console.error(error);
        return null;
    })
}

// Get Tafs from AWC
export function getAllTafs() {
    return fetch("https://www.aviationweather.gov/adds/dataserver_current/current/tafs.cache.xml")
    .then((response) => { return response.text() })
    .catch((error) => {
        console.error(error);
        return null;
    })
}

// https://bobbyhadz.com/blog/javascript-check-if-date-is-last-day-of-month
export function isLastDayOfMonth(date = new Date()) {
    const oneDayInMs = 1000 * 60 * 60 * 24;
    return new Date(date.getTime() + oneDayInMs).getDate() === 1;
}

// Takes Date Object and Number Hours; Returns Object with String Month Name, Day Number, and Hour Number;
export function dateFormatter(date, hours) {    
    let month = date.getMonth();
    let day = date.getDate();
    let hour = hours;

    if (hour >= 24) {
        // THIS MIGHT NOT WORK
        if (isLastDayOfMonth(date)) {
            if (month == 11) {
                month = 0;
            } else {
                month += 1;
            }
            day = 1;
        }
        else {
            day = day + 1;
        }
        hour = hour - 24;
    }

    return {"month" : monthAbbr[month], "day" : day, "hour" : hour};
}

// Turn Date and Timeline Value into Formatted String for Timeline
export function hoursDisplay(date, timelineValue) {
    const formatted = dateFormatter(date, timelineValue);

    return `${formatted.month}. ${formatted.day} ${ formatted.hour < 10 ? `0${formatted.hour}` : formatted.hour}:00`;
}

// Turn Date Object into Formatted String for Display on Flight Charting Screen
export function dateTimeString(date) {
    if (date instanceof Date) {
        const month = monthAbbr[date.getMonth()];
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${month}. ${date.getDate()}, ${ hours < 10 ? `0${hours}` : hours}:${ minutes < 10 ? `0${minutes}` : minutes}`;
    } else {
        return 'Select Date';
    }
}

// Input Validation for Flight Planning Inputs
export function validateInputs(mainPath, altPath) {
    let main = true;
    let alt = true;

    let mainMessage = null
    let altMessage = null;

    let tempMain = JSON.parse(JSON.stringify(mainPath));
    let tempAlt = JSON.parse(JSON.stringify(altPath));
    tempMain.shift();
    tempAlt.shift();

    // Main: smallest length
    if (tempMain.length == 2) {
        // Origin Null
        if (tempMain[0] == null && tempMain[1] != null) {
            mainMessage = "Origin Input Must Have a Value";
            main = false;
        }
        // Dest Null
        else if (tempMain[0] != null && tempMain[1] == null) {
            mainMessage = "Destination Input Must Have a Value";
            main = false;
        }
        // Both Null
        else if (tempMain[1] == null && tempMain[2] == null) {
            mainMessage = null;
            main = false;
        }
    }
    // Main: larger lengths
    else if (tempMain.length != 2) {
        if (tempMain.includes(null)) {
            mainMessage = "All Main Path Inputs Must Have Values";
            main = false;
        }
    }

    // Alternate: smallest length
    if (tempAlt.length == 2) {
        // Origin Null
        if (tempAlt[0] == null && tempAlt[1] != null) {
            altMessage = "Origin Input Must Have a Value";
            alt = false;
        }
        // Dest Null
        else if (tempAlt[0] != null && tempAlt[1] == null) {
            altMessage = "Destination Input Must Have a Value";
            alt = false;
        }
        // Both Null
        else if (tempAlt[1] == null && tempAlt[2] == null) {
            altMessage = null;
            alt = false;
        }
    }
    // Alternate: larger lengths
    else if (tempAlt.length != 2) {
        if (tempAlt.includes(null)) {
            altMessage = "All Alternate Path Inputs Must Have Values";
            alt = false;
        }
    }

    return [main, mainMessage, alt, altMessage];
}

export function toRadians(deg) {
    return deg * Math.PI / 180;
}

export function toDegrees(deg) {
    return deg * 180 / Math.PI;
}

// Calculate Distance Between Two Points on Earth
// https://www.geeksforgeeks.org/program-distance-two-points-earth/
export function distance(startLat, startLng, destLat, destLng) {
    // Convert to Radians
    startLat = toRadians(startLat);
    startLng = toRadians(startLng);
    destLat = toRadians(destLat);
    destLng = toRadians(destLng);

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

// https://github.com/react-native-maps/react-native-maps/issues/505
// Returns map region object that displays full path provided
export function getRegionForCoordinates(path) {
    let minX, maxX, minY, maxY;
    let points = JSON.parse(JSON.stringify(path));
    points.shift();
  
    // init first point
    ((point) => {
        minX = parseFloat(point.latitude[0]);
        maxX = parseFloat(point.latitude[0]);
        minY = parseFloat(point.longitude[0]);
        maxY = parseFloat(point.longitude[0]);
    })(points[0]);
  
    // calculate rect
    points.map((point) => {
        minX = Math.min(minX, parseFloat(point.latitude[0]));
        maxX = Math.max(maxX, parseFloat(point.latitude[0]));
        minY = Math.min(minY, parseFloat(point.longitude[0]));
        maxY = Math.max(maxY, parseFloat(point.longitude[0]));
    });
  
    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const deltaX = (maxX - minX);
    const deltaY = (maxY - minY);
  
    return {
        latitude: parseFloat(midX),
        longitude: parseFloat(midY),
        latitudeDelta: parseFloat(deltaX + 2),
        longitudeDelta: parseFloat(deltaY + 2)
    };
}

// Logic to decide which path to zoom to
export function getRegionFromPaths(main, alt) {
    const mainDist = !main.includes(null) ? distance(main[1].latitude[0], main[1].longitude[0], main[main.length - 1].latitude[0], main[main.length - 1].longitude[0]) : null;
    const altDist = !alt.includes(null) ? distance(alt[1].latitude[0], alt[1].longitude[0], alt[alt.length - 1].latitude[0], alt[alt.length - 1].longitude[0]) : null;

    let longerPath = null;
    if (mainDist !== null && altDist !== null) {
        longerPath = mainDist > altDist;
    }
    else if (mainDist !== null) {
        longerPath = true;
    }
    else if (altDist !== null) {
        longerPath = false;
    }

    if (longerPath) {
        return getRegionForCoordinates(main);
    } else {
        return getRegionForCoordinates(alt);
    }
}