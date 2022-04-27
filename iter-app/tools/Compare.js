// import React from 'react';
import { Alert } from 'react-native';
import { isLastDayOfMonth } from './Tools';
import { Decoder } from './Decoder';

// eslint-disable-next-line no-undef
const converter = require('react-native-xml2js');

// Check if Two Paths Have Same Origin/Destination
// Also Does Input Validation and Alerts Reason if alert==true
export function pathsMatch(main, alt, alert) {
    if (main[0].speed == '') {
        if (alert) Alert.alert("Main Path Cruise Speed Required");
        return false;
    }
    // else if (main[0].date == '') {
    //     if (alert) Alert.alert("Main Path Date Required");
    //     return false;
    // }
    else if (alt[0].speed == '') {
        if (alert) Alert.alert("Alternate Path Cruise Speed Required");
        return false;
    }
    // else if (alt[0].date == '') {
    //     if (alert) Alert.alert("Alternate Path Date Required");
    //     return false;
    // }
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

export function toRadians(deg) {
    return deg * Math.PI / 180;
}

export function toDegrees(deg) {
    return deg * 180 / Math.PI;
}

// https://stackoverflow.com/questions/46590154/calculate-bearing-between-2-points-with-javascript
export function bearing(startLat, startLng, destLat, destLng){
    startLat = toRadians(startLat);
    startLng = toRadians(startLng);
    destLat = toRadians(destLat);
    destLng = toRadians(destLng);

    const y = Math.sin(destLng - startLng) * Math.cos(destLat);
    const x = Math.cos(startLat) * Math.sin(destLat) -
          Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
    const brng = toDegrees(Math.atan2(y, x));
    return (brng + 360) % 360;
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

// Return Estimated Travel Time in Hours
export function time(distance, speed) {
    return distance / (speed * 1.15078);
}

// Get Stations Along Flight Path Within 15 Mile Radius
export function fetchStations(stationString) {
    const url = `https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&flightPath=15;${stationString}&hoursBeforeNow=3&mostRecentForEachStation=constraint`;

    return fetch(url)
    .then((response) => response.text())
    .catch((error) => {
        console.error(error);
    })
}

// Get Tafs for Station With Valid Time Inside Start and End Time Parrams
export function fetchTafs(id, start, end) {
    const url = `https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=tafs&requestType=retrieve&format=xml&startTime=${start}&endTime=${end}&timeType=valid&stationString=${id}`;

    return fetch(url)
    .then((response) => response.text())
    .catch((error) => {
        console.error(error);
    })
}

// Takes Array of Stations and Adds Tafs For Relevant Time
export async function addTafs(stations_in, info, origin, path, pathType) {
    let stations_out = stations_in;
    let date = info.date != null ? info.date : new Date();

    let startYear = date.getFullYear();
    let startMonth = date.getMonth();
    let startDay = date.getDate();
    let startHours = date.getHours();

    let tafsAdded = false;

    for (let i = 1; i < stations_out.length; i++) {
        if (stations_out[i].station_id[0] != origin) {
            const travelTime = time(
                distance(
                    stations_out[i-1].latitude[0],
                    stations_out[i-1].longitude[0],
                    stations_out[i].latitude[0],
                    stations_out[i].longitude[0],
                ),
                info.speed
            );
            let destYear = startYear;
            let destMonth = startMonth;
            let destDay = startDay;
            let destHours = startHours + travelTime;
            if (destHours >= 24) {
                if (destMonth == 11) {
                    destYear += 1;
                    destMonth = 0;
                }
                else if (isLastDayOfMonth(date)) {
                    destMonth += 1;
                    destDay = 1;
                }
                else {
                    destDay = destDay + 1;
                }
                
                destHours = destHours - 24;
            }

            const startDate = new Date(destYear, destMonth, destDay, destHours - 1, 30);
            const endDate = new Date(destYear, destMonth, destDay, destHours, 30);
        
            await fetchTafs(
                stations_out[i].station_id[0],
                startDate.toISOString(),
                endDate.toISOString()
            ).then(value => converter.parseString(value, function (err, result) {
                const tafs = result.response.data[0].TAF;
                if (tafs !== undefined) {
                    tafsAdded = true;
                    stations_out[i].tafs = tafs;
                }
            }));
        }
    }

    if (!tafsAdded) {
        Alert.alert(`${pathType}: No Forecasted Data Available for Selected Departure Time`);
    }

    return stations_out;
}

// Takes Path and Returns Stations Along The Path
// Includes Relevant Tafs to Estimated Time They Would Be Passed
export async function getPathStations(path, info, pathType) {
    let stations = [];
    let stationString = "";

    for (const point of path) {
        stationString += `${point.station_id[0]};`;
    }

    await fetchStations(stationString).then(value => converter.parseString(value, function (err, result) {
        stations = result.response.data[0].METAR;
    }))

    stations = await addTafs(stations, info, path[0].station_id[0], path, pathType)
    
    return stations;
}

// Add Two Degrees
export function addDegrees(a, b) {
    let result = a + b;
    if (result > 360) {
        result -= 360;
    }
    return result;
}

// Subtract Two Degrees
export function subtractDegrees(a, b) {
    let result = a - b;
    if (result < 0) {
        result += 360;
    }
    return result;
}

// Checks if Degree is Within Range of Degrees
export function withinDegreesRange(deg, left, right) {
    if (deg >= left && deg <= right) {
        return true;
    }
    else if (deg >= left && deg <= 360) {
        return true;
    }
    else if (deg >= 0 && deg <= right) {
        return true;
    } else {
        return false;
    }
}

// Takes Station and Returns Grade for Weather Condition
export function gradeStation(station, bearing) {
    let pointsPossible = 150 // 170 when WX added
    let points = 0;
    const taf = Object.prototype.hasOwnProperty.call(station, 'taf') ? station.taf : null;

    // Temperature - 10 Points
    let temp = station.temp_c[0];
    if (taf && Object.prototype.hasOwnProperty.call(taf, 'temperature')) {
        temp = taf.temperature[1];
    }
    if (temp >= 40) {
        points += 2;
    }
    else if (temp >= 35) {
        points += 5;
    }
    else if (temp >= 30) {
        points += 8;
    } else {
        points += 10;
    }

    // Dewpoint - 10 Points
    const dewpoint = station.dewpoint_c;
    const dewpointGap = temp - dewpoint;
    if (dewpoint >= 21) {
        points += 2;
    }
    else if (dewpointGap >= 10) {
        points += 10;
    }
    else if (dewpointGap >= 8) {
        points += 8;
    }
    else if (dewpointGap >= 6) {
        points += 5;
    }
    else if (dewpointGap >= 4) {
        points += 3;
    }
    else if (dewpointGap >= 2) {
        points += 1;
    }

    // Wind Speed, Direction & Gust - 20 Points, 30 Points, 10 points respectively
    let windSpeed = null;
    let direction = null;
    let windSpeedGrade = 20;
    
    if (Object.prototype.hasOwnProperty.call(station, 'wind_speed_kt')) {
        direction = Number(station.wind_dir_degrees);
        windSpeed = station.wind_speed_kt;
    }
    if (taf && Object.prototype.hasOwnProperty.call(taf, 'wind_speed_kt')) {
        direction = Number(taf.wind_dir_degrees[0]);
        windSpeed = taf.wind_speed_kt[0];
    }
    if (windSpeed) {
        // Speed
        for (let i = 0; i < windSpeed % 5; i++) {
            if (windSpeedGrade > 3) {
                windSpeedGrade -= 3;
            }
        }
        points += windSpeedGrade;

        // Direction
        if (withinDegreesRange(direction, addDegrees(bearing, 175), subtractDegrees(bearing, 175))) {
            points += 30;
        }
        else if (withinDegreesRange(direction, addDegrees(bearing, 160), addDegrees(bearing, 175)) ||
            withinDegreesRange(direction, subtractDegrees(bearing, 175), subtractDegrees(bearing, 160))) {
            points += 25;
        }
        else if (withinDegreesRange(direction, addDegrees(bearing, 145), addDegrees(bearing, 160)) ||
            withinDegreesRange(direction, subtractDegrees(bearing, 160), subtractDegrees(bearing, 145))) {
            points += 20;
        }
        else if (withinDegreesRange(direction, addDegrees(bearing, 130), addDegrees(bearing, 145)) ||
            withinDegreesRange(direction, subtractDegrees(bearing, 145), subtractDegrees(bearing, 130))) {
            points += 15;
        }
        else if (withinDegreesRange(direction, addDegrees(bearing, 115), addDegrees(bearing, 130)) ||
            withinDegreesRange(direction, subtractDegrees(bearing, 130), subtractDegrees(bearing, 115))) {
            points += 10;
        }
        else if (withinDegreesRange(direction, addDegrees(bearing, 100), addDegrees(bearing, 115)) ||
            withinDegreesRange(direction, subtractDegrees(bearing, 115), subtractDegrees(bearing, 100))) {
            points += 5;
        }
    } else {
        points += 20;
    }
    // Gust
    if (Object.prototype.hasOwnProperty.call(station, 'wind_gust_kt')) {
        const gust = station.wind_gust_kt[0] - windSpeed;
        if (gust > 20) {
            points += 2;
        }
        else if (gust > 15) {
            points += 4;
        }
        else if (gust > 10) {
            points += 6;
        }
        else if (gust > 5) {
            points += 8;
        }
        else {
            points += 10;
        }
    } else {
        points += 10;
    }

    // Visibility - 10 Points
    if (Object.prototype.hasOwnProperty.call(station, 'visibility_statute_mi')) {
        const visibility = station.visibility_statute_mi;
        if (visibility >= 15) {
            points += 10;
        }
        else if (visibility >= 10) {
            points += 5;
        }
    } else {
        points += 10;
    }

    // Sky Cover - 15 points Condition - 15 Points Ceiling
    let skyCondition = null;
    if (Object.prototype.hasOwnProperty.call(station, "sky_condition")) {
        skyCondition = station.sky_condition[0]["$"];
    }
    if (taf && Object.prototype.hasOwnProperty.call(taf, 'sky_condition')) {
        skyCondition = taf.sky_condition[0]["$"];
    }
    if (skyCondition) {
        switch (skyCondition.sky_cover) {
            case 'CLR':
                points += 15;
                break;
            case 'SKC':
                points += 13;
                break;
            case 'FEW':
                points += 10;
                break;
            case 'SCT':
                points += 8;
                break;
            case 'BKN':
                points += 6;
                break;
            case 'OVC':
                points += 4;
                break;
            case 'OVX':
                points += 2;
                break;
        }

        if (Object.prototype.hasOwnProperty.call(skyCondition, "cloud_base_ft_agl")) {
            const ceiling = skyCondition.cloud_base_ft_agl;
            if (ceiling >= 15000) {
                points += 15
            }
            else if (ceiling >= 10000) {
                points += 10;
            }
            else if (ceiling >= 8000) {
                points += 5;
            }
        } else {
            points += 15;
        }
    } else {
        points += 15;
    }

    // FLight Category - 30 Points
    let category = station.flight_category[0];
    if (taf) {
        let vis = null;
        if (Object.prototype.hasOwnProperty.call(taf, 'visibility_statute_mi')) {
            vis = taf.visibility_statute_mi[0];
        }
        if (vis && Object.prototype.hasOwnProperty.call(skyCondition, "cloud_base_ft_agl")) {
            category = Decoder.flightCategoryCalc(skyCondition.cloud_base_ft_agl, vis);
        }
    }
    switch (category) {
        case 'VFR':
            points += 30;
            break;
        case 'MVFR':
            points += 25;
            break;
        case 'IFR':
            points += 15;
            break;
        case 'LIFR':
            points += 5;
            break;
    }

    // WX String
    

    return (points / pointsPossible) * 100;
}

// Take Flight Path and Returns Grade for Weather Condition
export async function gradePath(path_in, pathType) {
    let path = path_in;
    const info = path.shift();

    let grade = 0;
    let amount = 0;

    const stations = await getPathStations(path, info, pathType);

    let bearingArray = [];
    for (let i = 1; i < path.length; i++) {
        bearingArray.push({
            id: path[i].station_id[0],
            lat: path[i].latitude[0],
            lng: path[i].longitude[0],
            bearing: bearing(
                path[i - 1].latitude[0],
                path[i - 1].longitude[0],
                path[i].latitude[0],
                path[i].longitude[0]
            )
        })
    }

    let bearingIterator = 0;
    for (const station of stations) {
        grade += gradeStation(station, bearingArray[bearingIterator].bearing);
        amount++;
        
        if ((station.latitude[0] - 1 < bearingArray[bearingIterator].lat && bearingArray[bearingIterator].lat < station.latitude[0] + 1)
            && (station.longitude[0] - 1 < bearingArray[bearingIterator].lng && bearingArray[bearingIterator].lng < station.longitude[0] + 1)) {
            bearingIterator += 1;
        }
    }

    return grade / amount;
}

export async function compare(main, alt) {
    let mainCopy = JSON.parse(JSON.stringify(main));
    let altCopy = JSON.parse(JSON.stringify(alt));

    // Make Dates Objects
    const tempMainDate = new Date(mainCopy[0].date);
    mainCopy[0].date = tempMainDate;
    const tempAltDate = new Date(altCopy[0].date);
    altCopy[0].date = tempAltDate;

    const mainGrade = await gradePath(mainCopy, "Main Path");
    const altGrade = await gradePath(altCopy, "Alternate Path");

    const result = mainGrade >= altGrade;
    return { result: result, string: `${result ? "Main" : "Alternate"}`};
}