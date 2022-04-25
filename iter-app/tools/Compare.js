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
    // Convert to Radians
    startLat = startLat * Math.PI / 180;
    startLng = startLng * Math.PI / 180;
    destLat = destLat * Math.PI / 180;
    destLng = destLng * Math.PI / 180;

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

// Return Estimated Travel Time in Hours
export function time(distance, info) {
    return distance / speed(info.speed, info.alti);
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

// Takes Path and Returns Stations Along The Path
// Includes Relevant Tafs to Estimated Time They Would Be Passed
export async function getPathStations(path, info) {
    let stations = [];
    let stationString = "";

    for (const point of path) {
        stationString += `${point.station_id[0]};`;
    }

    await fetchStations(stationString).then(value => converter.parseString(value, function (err, result) {
        stations = result.response.data[0].METAR;
    }))

    stations = await addTafs(stations, info, path[0].station_id[0])
    
    return stations;
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
export async function addTafs(stations_in, info, origin) {
    let stations_out = stations_in;
    let date = info.date != '' ? info.date : new Date();

    let startYear = date.getFullYear();
    let startMonth = date.getMonth();
    let startDay = date.getDate();
    let startHours = date.getHours();

    for (let i = 1; i < stations_out.length; i++) {
        if (stations_out[i].station_id[0] != origin) {
            const travelTime = time(
                distance(
                    stations_out[i-1].latitude[0],
                    stations_out[i-1].longitude[0],
                    stations_out[i].latitude[0],
                    stations_out[i].longitude[0],
                ),
                info
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
                stations_out[i].tafs = result.response.data[0].TAF;
            }));
        }
    }

    return stations_out;
}

// Takes Station and Returns Grade for Weather Condition
export function gradeStation(station) {
    const pointsPossible = 85;
    let points = 0;
    const taf = Object.prototype.hasOwnProperty.call(station, 'taf') ? station.taf : null;

    // Temperature
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

    // Dewpoint
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

    // Wind Speed & Gust
    let windSpeed = null;
    let windGrade = 20;
    if (Object.prototype.hasOwnProperty.call(station, 'wind_speed_kt')) {
        windSpeed = station.wind_speed_kt;
    }
    if (taf && Object.prototype.hasOwnProperty.call(taf, 'wind_speed_kt')) {
        windSpeed = taf.wind_speed_kt[0];
    }
    if (windSpeed) {
        for (let i = 0; i < windSpeed % 5; i++) {
            if (windGrade > 3) {
                windGrade -= 3;
            }
        }
    } else {
        points += 20;
    }
    if (Object.prototype.hasOwnProperty.call(station, 'wind_gust_kt')) {
        console.log(station.wind_gust_kt);
    }

    // Visibility
    // if (Object.prototype.hasOwnProperty.call(station, 'visibility_statute_mi')) {
    //     const visibility = station.visibility_statute_mi;
    //     if (visibility >= 20) {
    //         points += 15;
    //     }
    //     else if (visibility >= 15) {
    //         points += 10;
    //     }
    //     else if (visibility >= 10) {
    //         points += 5;
    //     }
    // } else {
    //     points += 15;
    // }

    // Sky Cover
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

        // if (Object.prototype.hasOwnProperty.call(skyCondition, "cloud_base_ft_agl")) {
        //     const ceiling = skyCondition.cloud_base_ft_agl;
        //     if (ceiling <= 1000) {
        //         points += 5
        //     }
        //     else if (ceiling <= 1500) {
        //         points += 10;
        //     }
        //     else if (ceiling <= 2000) {
        //         points += 13
        //     } else {
        //         points += 15;
        //     }
        // } else {
        //     points += 15;
        // }
    } else {
        points += 15;
    }

    // FLight Category
    let category = station.flight_category[0];
    let vis = null;
    if (taf) {
        if (Object.prototype.hasOwnProperty.call(station, 'visibility_statute_mi')) {
            vis = station.visibility_statute_mi;
        }
        if (taf && Object.prototype.hasOwnProperty.call(taf, 'visibility_statute_mi')) {
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
export async function gradePath(path_in) {
    let path = path_in;
    const info = path.shift();
    
    let grade = 0;
    let amount = 0;

    const stations = await getPathStations(path, info);

    for (const station of stations) {
        grade += gradeStation(station);
        amount++;
    }
    console.log(grade, amount);

    return grade / amount;
}

export async function compare(main, alt) {
    const mainGrade = await gradePath(main);
    const altGrade = await gradePath(alt);
    console.log("Main:", mainGrade);
    console.log("Alt:", altGrade);

    const result = mainGrade >= altGrade;

    Alert.alert(`The ${result ? "Main" : "Alternate"} Path has more favorable weather.`);
    return `The ${result ? "Main" : "Alternate"} Path has more favorable weather.`;
}