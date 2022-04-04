import { dayAbbr } from "./Values";

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

export function dateFormatter(date, hours) {    
    let month = dayAbbr[date.getMonth()];
    let day = date.getDate();
    let hour = hours;

    if (hours >= 24) {
        day = day + 1;
        hour = hour - 24;
    }

    return {"month" : month, "day" : day, "hour" : hour};
}

// Turn Date and Timeline Value into Formatted String for Timeline
export function hoursDisplay(date, timelineValue) {
    const formatted = dateFormatter(date, timelineValue);

    return `${formatted.month}. ${formatted.day} ${ formatted.hour < 10 ? `0${formatted.hour}` : formatted.hour}:00`;
}